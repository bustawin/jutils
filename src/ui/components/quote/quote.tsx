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
  if (blockquote) {
    return (
      <figure
        itemScope
        itemType="https://schema.org/Quotation"
        className="bquote"
      >
        <blockquote cite={url?.toString()} itemProp="text">
          {children}
        </blockquote>
        <figcaption className="muted">
          <Cite {...citeProps} url={url} isReference />
        </figcaption>
      </figure>
    )
  } else {
    const tooltip = (
      <>
        {text && <p>{text}</p>}
        <Cite {...citeProps} url={url} isReference />
      </>
    )

    return (
      <Note text={tooltip} itemScope itemType="https://schema.org/Quotation">
        <q
          itemProp="text"
          className={cls('quote', direct && 'direct')}
          cite={url?.toString()}
        >
          {children}
        </q>
      </Note>
    )
  }
}
