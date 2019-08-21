import React from 'react'
import Link from 'gatsby-link'

const NavLink = ({ url, text }) => (
  <Link
    to={url}
    activeClassName="font-bold"
    className={`${
      !url ? 'text-grey-lighter pointer-events-none' : ''
    } no-underline mx-4`}
  >
    {text}
  </Link>
)

export default function Pagination({
  currentPage,
  numberOfPages,
  nextPagePath,
  previousPagePath
}) {
  return (
    <div className="flex justify-center items-center my-2">
      <NavLink url={previousPagePath} text="‹‹" />
      {Array.from({ length: numberOfPages }).map((_, i) => {
        const index = i + 1
        const url = i < 1 ? '/products' : `/products/${index}`

        return <NavLink key={index} url={url} text={index} />
      })}
      <NavLink url={nextPagePath} text="››" />
    </div>
  )
}
