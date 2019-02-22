import React from 'react'
import { graphql } from 'gatsby'

import Photo from '../components/Photo'
import AddToCart from '../components/AddToCart'

function ProductPage({ data: { product } }) {
  const {
    meta: { display_price }
  } = product

  return (
    <div className="flex flex-wrap md:bg-grey-light">
      <div className="py-2 md:py-5 md:px-5 w-full lg:w-1/2">
        <div className="sticky pin-t">
          <Photo src={product.mainImage} />
        </div>
      </div>

      <div className="py-2 md:py-5 md:px-5 md:pr-10 w-full lg:w-1/2">
        <div className="my-2 flex flex-col md:flex-col-reverse">
          <h1 className="text-3xl md:text-5xl text-black font-normal">
            {product.name}
          </h1>

          <span className="block text-grey text-xl md:my-2 md:mt-8">
            {display_price.without_tax.formatted}
          </span>
        </div>

        <div className="flex flex-wrap flex-col md:flex-row md:items-end">
          <AddToCart productId={product.id} />
        </div>

        <div className="my-2 md:my-5">
          <h4 className="hidden md:block text-lg text-black font-bold my-2">
            Description
          </h4>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductPage

export const query = graphql`
  query($id: String!) {
    product: moltinProduct(id: { eq: $id }) {
      id
      slug
      name
      description
      mainImage {
        childImageSharp {
          fixed(width: 560) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      meta {
        display_price {
          without_tax {
            formatted
          }
        }
      }
    }
  }
`
