import { Children, cls } from '@jutils/ui/reactUtils'
import Icon from '@jutils/ui/components/icon/Icon'
import Tooltip from '../tooltip/Tooltip'

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
            <Icon name="chat-left-text-fill" />
          </span>
        </sup>
      </Tooltip>
    </span>
  )
}
