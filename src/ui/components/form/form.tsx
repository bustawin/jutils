import {
  Field,
  FieldNoFloating,
  FieldProps,
} from '@jutils/ui/components/form/field'
import { useField, useIsValid, ValidatedForm } from 'remix-validated-form'
import { SubmitButton } from './button'
import { Form as RBForm } from 'react-bootstrap'
import { Children, ClassName } from '@jutils/ui/reactUtils'

export interface FormProps {
  schema: any // todo
  id: string
  buttonText?: string
  children: Children
}

export function Form({
  schema,
  id,
  children,
  buttonText = 'Submit',
}: FormProps) {
  const formIsValid = useIsValid(id)
  const form = (
    <ValidatedForm
      id={id}
      validator={schema}
      method="post"
      noValidate
      className="needs-validation"
    >
      {children}
    </ValidatedForm>
  )
  const button = <SubmitButton id={id}>{buttonText}</SubmitButton>
  return [form, button]
}

export interface InputProps extends FieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'tel'
}

export function Input({ type = 'text', name, id, ...fieldProps }: InputProps) {
  const { touched, error, getInputProps } = useField(id)
  const inputProps = getInputProps({ id, type })
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

export function File({ name, id, ...fieldProps }: FieldProps) {
  const { touched, error, getInputProps } = useField(id)
  const inputProps = getInputProps({ id })
  return (
    <FieldNoFloating {...fieldProps} name={name} id={id}>
      <RBForm.Control
        type="file"
        multiple
        accept="image/*"
        className="form--file"
        isValid={touched && !error}
        isInvalid={error}
        placeholder={name}
        {...inputProps}
      />
    </FieldNoFloating>
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
