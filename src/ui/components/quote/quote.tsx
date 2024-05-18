import { Children, cls } from '@jutils/ui/reactUtils'
import Cite, { CiteProps } from '../cite/cite'
import Note from '@jutils/ui/components/note/note'

export interface QProps extends CiteProps {
  id: string
  children: Children
  direct?: boolean
  text?: Children
}

export default function Q({
  children,
  text,
  direct = false,
  url,
  ...citeProps
}: QProps) {
  const tooltip = (
    <>
      {text && <p>{text}</p>}
      <Cite {...citeProps} url={url} />
    </>
  )

  return (
    <Note text={tooltip} className={cls('quote', direct && 'direct')}>
      {children}
    </Note>
  )
}
