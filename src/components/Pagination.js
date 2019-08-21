import React from 'react'
import Link from 'gatsby-link'

const NavLink = ({ resource, url, text, disabled }) => (
  <Link
    to={`/${resource}/${url}`}
    activeStyle={{ fontWeight: 'bold' }}
    className={`${
      disabled ? 'text-grey-lighter pointer-events-none' : ''
    } no-underline mx-4`}
  >
    {text}
  </Link>
)

export default function Pagination({ index, pageCount, resource }) {
  const previousUrl = index - 1 === 1 ? '/' : (index - 1).toString()
  const nextUrl = (index + 1).toString()

  return (
    <div className="flex justify-center items-center">
      <NavLink
        disabled={index === 1}
        url={previousUrl}
        resource={resource}
        text="‹‹"
      />
      {Array.from({ length: pageCount }).map((_, index) => (
        <NavLink
          url={index + 1 === 1 ? '/' : index + 1}
          resource={resource}
          text={index + 1}
        />
      ))}
      <NavLink
        disabled={index === pageCount}
        url={nextUrl}
        resource={resource}
        text="››"
      />
    </div>
  )
}
