import React, { useContext } from 'react'
import { Link } from 'gatsby'
import cx from 'classnames'

import { LayoutContext } from '../context/LayoutContext'
import Photo from './Photo'
import Badge from './Badge'

export default function Product({ id, slug, name, mainImage, meta, on_sale }) {
  const { isGrid, isList } = useContext(LayoutContext)
  const price = meta.display_price.without_tax.formatted

  const linkClass = cx(null, {
    'flex flex-row items-center': isList
  })

  const photoClass = cx(null, {
    'w-16 md:w-32': isList
  })

  const infoClass = cx(null, {
    'pt-4 pb-2': isGrid,
    'w-2/3 ml-6': isList
  })

  return (
    <article key={id} className="px-5 py-2 w-full md:p-5 md:w-1/2 lg:w-1/3">
      <Link
        to={`/products/${slug}`}
        className="block w-full h-full no-underline"
      >
        <div className={linkClass}>
          <div className={photoClass}>
            <Photo src={mainImage} />
          </div>

          <div className={infoClass}>
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
        </div>
      </Link>
    </article>
  )
}
