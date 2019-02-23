import React from 'react'
import { graphql } from 'gatsby'

import PageTitle from '../components/PageTitle'
import ProductGrid from '../components/ProductGrid'

function CollectionPage({ data: { category } }) {
  return (
    <>
      <PageTitle title={category.name} description={category.description} />
      <ProductGrid products={category.products} />
    </>
  )
}

export default CollectionPage

export const query = graphql`
  query($id: String!) {
    category: moltinCategory(id: { eq: $id }) {
      id
      slug
      name
      description
      products {
        id
        name
        slug
        on_sale
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
  }
`
