import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

function ProductPageTemplate({ data }) {
  return (
    <Layout>
      <h1>{data.product.name}</h1>
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
