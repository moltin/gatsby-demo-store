import React from 'react'
import { Link } from 'gatsby'

import Photo from './Photo'
import Badge from './Badge'

export default function Product({ id, slug, name, mainImage, meta, on_sale }) {
  const price = meta.display_price.without_tax.formatted

  return (
    <article key={id} className="px-5 py-2 w-full md:p-5 md:w-1/2 lg:w-1/3">
      <Link
        to={`/products/${slug}`}
        className="block w-full h-full no-underline"
      >
        <Photo src={mainImage} style={{ maxHeight: '400px' }} />

        <div className="pt-4 pb-2">
          <p className="text-black no-underline flex items-center">
            {name}
            {on_sale && (
              <Badge color="green" className="mx-2">
                On Sale
              </Badge>
            )}
          </p>
          <span className="text-grey text-sm">{price}</span>
        </div>
      </Link>
    </article>
  )
}
