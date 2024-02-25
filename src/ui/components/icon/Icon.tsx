import bsIcons from 'bootstrap-icons/bootstrap-icons.svg'
import * as ut from '@jutils/ui/reactUtils'

interface IconProps {
  className?: ut.ClassName
  name: string
  button?: boolean
}

export default function Icon({ name, button = false, className }: IconProps) {
  return (
    <svg
      className={ut.cls('bi', 'icon', button && 'icon--button', className)}
      fill="currentColor"
    >
      <use xlinkHref={`${bsIcons}#${name}`} />
    </svg>
  )
}
