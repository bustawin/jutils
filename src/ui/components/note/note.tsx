import { Children, cls } from '@jutils/ui/reactUtils'
import Tooltip from '../tooltip/Tooltip'
import Icon from '../icon/Icon'

export interface NoteProps {
  children: Children
  text: Children
  className?: string
}

export default function Note({ children, text, className }: NoteProps) {
  return (
    <span className={cls('note', className)}>
      <span className="note__children">{children}</span>
      <Tooltip tooltip={text}>
        <sup>
          <span className="note__link">
            <Icon name="info" />
          </span>
        </sup>
      </Tooltip>
    </span>
  )
}
