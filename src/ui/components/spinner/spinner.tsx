import { Spinner as RBSpinner } from 'react-bootstrap'

export default function Spinner() {
  return (
    <RBSpinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </RBSpinner>
  )
}
