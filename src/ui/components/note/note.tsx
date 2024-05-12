import { Children } from '@jutils/ui/reactUtils'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

export interface NoteProps {
  id: string
  children: Children
  text: Children
}

export default function Note({ children, text }: NoteProps) {
  return (
    <OverlayTrigger overlay={<Tooltip>{text}</Tooltip>}>
      <span className="note__link">{children}*</span>
    </OverlayTrigger>
  )
}
