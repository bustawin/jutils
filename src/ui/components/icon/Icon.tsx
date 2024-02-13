import bsIcons from 'bootstrap-icons/bootstrap-icons.svg'
import { ClassNameOnlyProp, cls } from '@jutils/ui/reactUtils'

interface IconProps extends ClassNameOnlyProp {
  name: string
}

export default function Icon({ name, className }: IconProps) {
  return (
    <svg className={cls('bi', 'icon', className)} fill="currentColor">
      <use xlinkHref={`${bsIcons}#${name}`} />
    </svg>
  )
}
