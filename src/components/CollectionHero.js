import React from 'react'
import { Link } from 'gatsby'

import Photo from './Photo'

export default function CollectionHero({ name, slug, description, products }) {
  const { mainImage, name: productName } = products[
    Math.floor(Math.random() * products.length)
  ]

  return (
    <div className="container relative">
      <div className="py-12 px-8 md:px-0">
        <div className="flex justify-between">
          <div className="text-center md:text-left md:my-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-black font-normal mb-4">
              {name}
            </h1>
            <p>{description}</p>

            <Link
              to={`/collections/${slug}`}
              className="inline-block appearance-none border border-b-3 border-black text-black mt-8 px-4 py-3 leading-tight rounded-none focus:outline-none my-2 no-underline"
            >
              Shop Now
            </Link>
          </div>
          <Photo src={mainImage} style={{ maxHeight: '400px' }} />
        </div>
      </div>
    </div>
  )
}
