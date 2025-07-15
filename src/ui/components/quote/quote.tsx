import { Children, cls } from '@jutils/ui/reactUtils'
import Cite, { CiteProps } from '../cite/cite'
import Note from '@jutils/ui/components/note/note'
import './quote.css'

export interface QProps extends CiteProps {
  id: string
  children: Children
  direct?: boolean
  text?: Children
  blockquote?: boolean
}

export default function Q({
  children,
  text,
  direct = false,
  blockquote = false,
  url,
  ...citeProps
}: QProps) {
  const tooltip = (
    <>
      {text && <p>{text}</p>}
      <Cite {...citeProps} url={url} />
    </>
  )

  if (blockquote) {
    return (
      <figure className="bquote">
        <blockquote cite={url?.toString()}>{children}</blockquote>
        <figcaption className="muted">
          <Cite {...citeProps} url={url} />
        </figcaption>
      </figure>
    )
  } else {
    return (
      <Note text={tooltip}>
        <q className={cls('quote', direct && 'direct')} cite={url?.toString()}>
          {children}
        </q>
      </Note>
    )
  }
}
