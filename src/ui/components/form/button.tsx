import { useIsSubmitting } from 'remix-validated-form'
import Spinner from '../spinner/spinner'
import { Children } from '@jutils/ui/reactUtils'
import { Button } from 'react-bootstrap'

interface SubmitButtonProps {
  id: string
  children: Children
}

export function SubmitButton({ id, children }: SubmitButtonProps) {
  const isSubmitting = useIsSubmitting(id)
  return (
    <Button type="submit" disabled={isSubmitting} form={id}>
      {isSubmitting ? <Spinner /> : children}
    </Button>
  )
}
