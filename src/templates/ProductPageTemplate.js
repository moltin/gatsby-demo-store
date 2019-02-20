import React, { useContext } from 'react'
import { graphql } from 'gatsby'

import { CartContext } from '../components/CartContext'
import Layout from '../components/Layout'

function ProductPageTemplate({ data }) {
  const { addToCart } = useContext(CartContext)

  return (
    <Layout>
      <h1>{data.product.name}</h1>
      <button
        onClick={() => addToCart(data.product.id, 1)}
        className="inline-block appearance-none bg-black border border-black text-white px-4 py-3 leading-tight rounded-none focus:outline-none my-2"
      >
        Add to Cart
      </button>
    </Layout>
  )
}

export default ProductPageTemplate

export const query = graphql`
  query($slug: String!) {
    product: moltinProduct(slug: { eq: $slug }) {
      id
      slug
      name
    }
  }
`
