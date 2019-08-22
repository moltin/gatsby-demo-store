import React, { useMemo } from 'react'
import Link from 'gatsby-link'
import cx from 'classnames'

const PaginationLink = ({ url, text, label }) => {
  const paginationLinkClass = useMemo(
    () =>
      cx('no-underline mx-4', {
        'text-grey-lighter pointer-events-none': !url
      }),
    [url]
  )

  return (
    <Link
      to={url}
      aria-label={label}
      activeClassName="font-bold"
      className={paginationLinkClass}
    >
      {text}
    </Link>
  )
}

export default function Pagination({
  numberOfPages,
  nextPagePath,
  previousPagePath,
  resource
}) {
  const paginationPages = useMemo(
    () =>
      Array.from({ length: numberOfPages }).map((_, i) => {
        const index = i + 1
        const url = i < 1 ? `/${resource}` : `/${resource}/${index}`

        return <PaginationLink key={index} url={url} text={index} />
      }),
    [numberOfPages]
  )

  return (
    <div className="flex justify-center items-center my-2">
      <PaginationLink label="Previous" url={previousPagePath} text="‹‹" />
      {paginationPages}
      <PaginationLink label="Next" url={nextPagePath} text="››" />
    </div>
  )
}
