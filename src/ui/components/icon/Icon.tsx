import * as ut from '@jutils/ui/reactUtils'
import './icon.css'

interface IconProps {
  className?: ut.ClassName
  name: string
  button?: boolean
  // Can't import icons directly because of a vite bug https://github.com/vitejs/vite/issues/4454
  path?: string
}

export default function Icon({
  name,
  button = false,
  className,
  path = '/icons.svg',
}: IconProps) {
  return (
    <svg
      className={ut.cls('bi', 'icon', button && 'icon--button', className)}
      fill="currentColor"
    >
      <use xlinkHref={`${path}#${name}`} />
    </svg>
  )
}
