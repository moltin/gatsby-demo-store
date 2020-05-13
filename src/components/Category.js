import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

export default function Category({ name, slug, description, products }) {
  const product = products
    ? products[Math.floor(Math.random() * products.length)]
    : null

  return (
    <article className="px-8 md:px-4 py-2 my-6 w-full lg:w-1/3">
      {product && (
        <div className="cursor-pointer flex items-center justify-center w-full overflow-hidden relative">
          <Link to={`/categories/${slug}`}>
            {product.mainImage && (
              <Img
                fluid={product.mainImage.childImageSharp.fluid}
                alt={product.name}
              />
            )}
          </Link>
        </div>
      )}

      <div className="text-center mx-auto md:p-8">
        <div className="my-4">
          <h1 className="text-2xl md:text-3xl text-black font-normal mb-2">
            {name}
          </h1>
          <p className="block text-grey mb-2">{description}</p>
        </div>

        <Link
          to={`/categories/${slug}`}
          className="inline-block appearance-none bg-white border border-b-3 border-black text-black px-4 py-3 leading-tight rounded-none focus:outline-none my-2 no-underline"
        >
          Discover
        </Link>
      </div>
    </article>
  )
}
