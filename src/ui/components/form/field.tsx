import * as React from 'react'
import * as ut from '@jutils/ui/reactUtils'
import { FloatingLabel, Form } from 'react-bootstrap'
import { useField } from 'remix-validated-form'

export interface FieldProps {
  id: string
  name: string
  description?: React.ReactNode
}

interface FieldPropsWithChildren extends FieldProps {
  children: ut.Children
}

export function Field({
  name,
  id,
  children,
  description,
}: FieldPropsWithChildren) {
  const { error } = useField(id)

  const [descriptionEl, errorEl] = fieldExtra(description, error)

  return (
    <FloatingLabel controlId={id} label={name} className="field">
      {children}
      {description && descriptionEl}
      {error && errorEl}
    </FloatingLabel>
  )
}

export function FieldNoFloating({
  name,
  id,
  children,
  description,
}: FieldPropsWithChildren) {
  const { error } = useField(id)

  const [descriptionEl, errorEl] = fieldExtra(description, error)

  return (
    <Form.Group controlId={id} className="field">
      <Form.Label>{name}</Form.Label>
      {children}
      {description && descriptionEl}
      {error && errorEl}
    </Form.Group>
  )
}

function fieldExtra(description: React.ReactNode, error: string | undefined) {
  const descriptionEl = description && <Form.Text>{description}</Form.Text>
  const errorEl = error && (
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
  )
  return [descriptionEl, errorEl]
}
