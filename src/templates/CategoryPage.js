import React from 'react'
import { graphql } from 'gatsby'

function CollectionPageTemplate({ data: { product } }) {
  const {
    meta: { display_price }
  } = product

  return (
    <>
      <PageTitle title={category.name} description={category.description} />
      <ProductGrid products={products} />
    </>
  )
}

export default CollectionPageTemplate

export const query = graphql`
  query($slug: String!) {
    product: moltinProduct(slug: { eq: $slug }) {
      id
      slug
      name
      description
      mainImage {
        childImageSharp {
          fixed(width: 400) {
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
