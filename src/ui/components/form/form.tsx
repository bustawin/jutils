import it from 'iterated'
import {
  Field,
  FieldNoFloating,
  FieldProps,
} from '@jutils/ui/components/form/field'
import { useControlField, useField, ValidatedForm } from 'remix-validated-form'
import { SubmitButton } from './button'
import { Col, Form as RBForm, Image as RBImage, Row } from 'react-bootstrap'
import { Children, ClassName } from '@jutils/ui/reactUtils'
import { SyntheticEvent } from 'react'
import { fileToBase64 } from '@ui/utils/file'

export interface FormProps {
  schema: any // todo
  id: string
  buttonText?: string
  children: Children
  defaultValues?: any // todo
}

export function Form({
  schema,
  id,
  children,
  buttonText = 'Submit',
  defaultValues,
}: FormProps) {
  const form = (
    <ValidatedForm
      id={id}
      validator={schema}
      method="post"
      noValidate
      className="needs-validation"
      encType="multipart/form-data"
      defaultValues={defaultValues}
    >
      {children}
    </ValidatedForm>
  )
  const button = <SubmitButton id={id}>{buttonText}</SubmitButton>
  return [form, button]
}

export interface InputProps extends FieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'tel'
  onChange?: (event: SyntheticEvent) => void
}

export function Input({
  type = 'text',
  name,
  id,
  onChange,
  ...fieldProps
}: InputProps) {
  const { touched, error, getInputProps } = useField(id)
  const inputProps = getInputProps({ id, type, onChange })
  return (
    <Field {...fieldProps} name={name} id={id}>
      <RBForm.Control
        isValid={touched && !error}
        isInvalid={error}
        placeholder={name}
        {...inputProps}
      />
    </Field>
  )
}

export interface TextareaProps extends FieldProps {}

export function Textarea({ name, id, ...fieldProps }: TextareaProps) {
  const { touched, error, getInputProps } = useField(id)
  const inputProps = getInputProps({ id })
  return (
    <Field {...fieldProps} name={name} id={id}>
      <RBForm.Control
        as="textarea"
        className="form--textarea"
        isValid={touched && !error}
        isInvalid={error}
        placeholder={name}
        {...inputProps}
      />
    </Field>
  )
}

export interface FileProps extends FieldProps {
  accept?: string[]
}

export function File({ name, id, accept = [], ...fieldProps }: FileProps) {
  const { touched, error, getInputProps } = useField(id)
  const inputProps = getInputProps({ id })
  return (
    <FieldNoFloating {...fieldProps} name={name} id={id}>
      <RBForm.Control
        type="file"
        multiple
        accept={accept.join(',')}
        className="form--file"
        isValid={touched && !error}
        isInvalid={error}
        placeholder={name}
        {...inputProps}
      />
    </FieldNoFloating>
  )
}

async function processFiles(files: File[]) {
  return await it.pipe(
    files,
    it.map.p(fileToBase64),
    it.async,
    it.await,
    it.array
  )
}

export const acceptedImages = [
  'image/jpeg',
  'image/png',
  'image/jp2',
  'image/webp',
  'image/heic',
]

export function Image({
  name,
  id,
  accept = acceptedImages,
  ...fieldProps
}: FileProps) {
  const { touched, error, getInputProps, validate } = useField(id)
  const [images, setImages] = useControlField<string[]>(id)

  const handleFileChange = (event) => {
    processFiles(event.target.files).then((images_) => {
      setImages(images_)
      validate()
    })
  }

  return (
    <>
      <Row className="mb-2">
        <Col>
          <FieldNoFloating {...fieldProps} name={name} id={id}>
            <RBForm.Control
              type="file"
              multiple
              accept={accept.join(',')}
              className="form--file"
              isValid={touched && !error}
              isInvalid={error}
              placeholder={name}
              onChange={handleFileChange}
            />
          </FieldNoFloating>
        </Col>
      </Row>
      <Row>
        {images &&
          images.map((image, i) => (
            <Col xs={6} key={i}>
              <RBImage
                src={`data:image/webp;base64,${image}`}
                className="form--image__image"
                thumbnail
              />
              <input type="hidden" name={id} value={image} />
            </Col>
          ))}
      </Row>
    </>
  )
}

export interface FieldsetProps {
  className?: ClassName
  children: Children
}

export function Fieldset({ className, children }: FieldsetProps) {
  return <fieldset className={className}>{children}</fieldset>
}

export interface LegendProps {
  children: Children
  className?: ClassName
}

export function Legend({ children, className }: LegendProps) {
  return <legend className={className}>{children}</legend>
}
