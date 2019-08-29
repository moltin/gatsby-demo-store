import React from 'react'
import { Link } from 'gatsby'

import Photo from './Photo'

function Hit({ hit: { id, slug, name, price, imgUrl } }) {
  return (
    <Link
      to={`/products/${slug}`}
      className="block w-full h-full no-underline"
      key={id}
    >
      <div className="flex flex-row items-center">
        <div className="w-16 md:w-32">
          <Photo src={imgUrl} cartImg />
        </div>

        <div className="w-2/3 ml-6">
          <p className="text-black no-underline flex items-center">{name}</p>
          <span className="text-grey text-sm">{price}</span>
        </div>
      </div>
    </Link>
  )
}

export default Hit
