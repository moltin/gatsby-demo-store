import React from 'react'
import { Link } from 'gatsby'

const Hit = ({ hit }) => {
  if (!hit) return null

  return (
    <Link
      to={`/products/${hit.slug}`}
      className="flex items-center no-underline focus:bg-grey-light p-2 hover:bg-grey-lightest focus:bg-grey-lightest focus:outline-none group"
    >
      <div className="w-24 mr-4">
        <img src={hit.imgUrl} title={hit.name} role="presentation" />
      </div>
      <div>
        <strong className="block text-grey-dark group-focus:text-black">
          {hit.name}
        </strong>
        <span className="text-grey-lighter text-sm">{hit.price}</span>
      </div>
    </Link>
  )
}

export default Hit
