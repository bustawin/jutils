import bsIcons from 'bootstrap-icons/bootstrap-icons.svg'
import * as ut from '@jutils/ui/reactUtils'

interface IconProps {
  className?: ut.ClassName
  name: string
}

export default function Icon({ name, className }: IconProps) {
  return (
    <svg className={ut.cls('bi', 'icon', className)} fill="currentColor">
      <use xlinkHref={`${bsIcons}#${name}`} />
    </svg>
  )
}
