import { Children, cls, Props } from '@jutils/ui/reactUtils'
import Tooltip from '../tooltip/Tooltip'
import Icon from '../icon/Icon'
import './note.css'

export interface NoteProps extends Props {
  children: Children
  text: Children
  className?: string
}

export default function Note({ children, text, className, ...props }: NoteProps) {
  return (
    <span className={cls('note', className)} {...props}>
      <span className="note__children">{children}</span>&nbsp;<Tooltip tooltip={text} className="note__link">&nbsp;<sup className="note__link__link">
          <Icon name="info" />
        </sup>
      </Tooltip>
    </span>
  )
}
