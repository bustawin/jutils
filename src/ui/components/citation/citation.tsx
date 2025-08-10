import { Children } from '../../reactUtils'
import Cite, { citeMeta, CiteProps } from '../cite/cite'
import Note from '../note/note'

export interface QProps extends CiteProps {
  id: string
  children: Children
  direct?: boolean
  text?: Children
  blockquote?: boolean
}

/**
 * Generates a citation.
 * If `direct` is `true`, the citation is a short in line quotation.
 * If `blockquote` is `true`, the citation is a block quote.
 * APA style recommends quotations [to be more than 40 characters](https://apastyle.apa.org/style-grammar-guidelines/citations/quotations).
 */
export default function Citation({
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
          <Cite {...citeProps} url={url} />
        </figcaption>
      </figure>
    )
  }

  const tooltip = (
    <>
      {text && <p>{text}</p>}
      <Cite {...citeProps} url={url} />
    </>
  )

  if (direct) {
    return (
      <Note text={tooltip} itemScope itemType="https://schema.org/Quotation">
        <q itemProp="text" cite={url?.toString()}>
          {children}
        </q>
      </Note>
    )
  }

  return (
    <Note
      text={tooltip}
      itemScope
      itemProp="citation"
      itemType="https://schema.org/Statement"
    >
      <span itemProp="text">{children}</span>
      {citeMeta(citeProps)}
    </Note>
  )
}
