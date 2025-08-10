export interface CiteProps {
  author?: string
  authors?: string[]
  title: string
  url?: URL | string
  page?: number
  paragraph?: number
  month?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  year?: number
}

export function citeMeta({
  author,
  authors = [],
  title,
  url,
  page,
  month,
  year,
}: CiteProps) {
  if (author) authors.push(author)
  return (
    <>
      {url && <link itemProp="url" href={url.toString()} />}
      {title && <meta itemProp="name" content={title} />}
      {authors.map((author) => (
        <meta key={author} itemProp="author" content={author} />
      ))}
      {page && <meta itemProp="pagination" content={page.toString()} />}
      {(month || year) && (
        <meta itemProp="dateModified" content={monthDateToISO(year, month)} />
      )}
    </>
  )
}

function monthDateToISO(year?: number, month?: number): string {
  return `${year}${(month && '-') ?? ''}${
    month?.toString().padStart(2, '0') ?? ''
  }`
}

export default function Cite({
  author,
  authors = [],
  title,
  url,
  page,
  paragraph,
  month,
  year,
}: CiteProps) {
  if (author) authors.push(author)
  const _authors = authors.map((author, i, authors) => (
    <span key={author}>
      <span itemProp="author">{author}</span>
      {i === authors.length - 1 ? ', ' : '.'}
    </span>
  ))

  const _title = url ? (
    <a href={url.toString()} itemProp="url">
      <span itemProp="name">{title}</span>
    </a>
  ) : (
    <span itemProp="name">{title}</span>
  )

  const _location = (
    <span>
      &nbsp;(p. <span itemProp="pagination">{page}</span>
      {paragraph && <span>&nbsp;paragraph {paragraph}</span>} )
    </span>
  )

  let namedMonth
  if (month) {
    const monthDate = new Date()
    monthDate.setMonth(month - 1)
    namedMonth = monthDate.toLocaleString(undefined, { month: 'long' })
  }

  const date = (
    <time itemProp="dateModified" dateTime={monthDateToISO(year, month)}>
      &nbsp;({namedMonth}
      {namedMonth && ' '}
      {year})
    </time>
  )

  return (
    <cite itemProp="isBasedOn" itemScope itemType="https://schema.org/Article">
      {_authors}
      {_title}
      {page && _location}
      {year && date}
    </cite>
  )
}
