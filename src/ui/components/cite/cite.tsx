export interface CiteProps {
  author?: string
  authors?: string[]
  title: string
  url?: URL | string
  page?: number
  paragraph?: number
  month?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  year?: number
  type: 'blog'
}

const schemaType: Record<CiteProps['type'], string> = {
  blog: 'http://schema.org/BlogPosting',
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
  type = 'blog',
}: CiteProps) {
  if (author) authors.push(author)
  const _authors = authors.map((author, i, authors) => (
    <span key={author}>
      <span itemProp="author">{author}</span>
      {i === authors.length - 1 ? ', ' : '.'}
    </span>
  ))

  const _title = url ? (
    <a href={url.toString()} itemProp="name">
      {title}
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
    console.log(monthDate)
    namedMonth = monthDate.toLocaleString(undefined, { month: 'long' })
  }

  const date = (
    <time
      itemProp="dateModified"
      itemType="date"
      dateTime={`${year}${month && '-'}${month}`}
    >
      &nbsp;({namedMonth}
      {namedMonth && ' '}
      {year})
    </time>
  )

  return (
    <cite
      itemProp="citation"
      itemScope
      itemType={schemaType[type]}
      itemID={url && url.toString()}
    >
      {_authors}
      {_title}
      {page && _location}
      {year && date}
    </cite>
  )
}
