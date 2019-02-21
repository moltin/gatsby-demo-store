import React, { useContext } from 'react'
import { graphql } from 'gatsby'

import { CartContext } from '../components/CartContext'
import Photo from '../components/Photo'

function ProductPage({ data: { product } }) {
  const { addToCart } = useContext(CartContext)

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

          <span className="block text-grey text-xl my-2 md:mt-8">
            {display_price.without_tax.formatted}
          </span>
        </div>

        <div className="flex flex-wrap flex-col md:flex-row md:items-end">
          <button
            onClick={() => addToCart(product.id, 1)}
            className="inline-block appearance-none bg-black border border-black text-white px-4 py-3 leading-tight rounded-none focus:outline-none my-2"
          >
            Add to Cart
          </button>
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
