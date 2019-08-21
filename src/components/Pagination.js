import React from 'react'
import Link from 'gatsby-link'

const NavLink = props => {
  if (!props.disable) {
    return (
      <Link
        to={`/${props.resource}/${props.url}`}
        activeStyle={{ fontWeight: 'bold' }}
        className="no-underline mx-4"
      >
        {props.text}
      </Link>
    )
  } else {
    return <span className="text-grey-lighter mx-4">{props.text}</span>
  }
}

export default function Pagination({ index, pageCount, resource }) {
  const previousUrl = index - 1 === 1 ? '/' : (index - 1).toString()
  const nextUrl = (index + 1).toString()

  return (
    <div className="flex justify-center items-center">
      <NavLink
        disable={index === 1}
        url={previousUrl}
        resource={resource}
        text="‹‹ Prev"
      />
      {Array.from({ length: pageCount }).map((_, index) => (
        <NavLink
          url={index + 1 === 1 ? '/' : index + 1}
          resource={resource}
          text={index + 1}
        />
      ))}
      <NavLink
        disable={index === pageCount}
        url={nextUrl}
        resource={resource}
        text="Next ››"
      />
    </div>
  )
}
