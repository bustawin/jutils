import * as ut from '@jutils/ui/reactUtils'
import Icon from '@jutils/ui/components/icon/Icon'

interface IconProps {
  className?: ut.ClassName
  name: string
  children: ut.Children
}

export default function IconWithText({ name, className, children }: IconProps) {
  return (
    <span className="icon-with-text">
      <Icon name={name} />
      <span className="icon-with-text__text">{children}</span>
    </span>
  )
}
