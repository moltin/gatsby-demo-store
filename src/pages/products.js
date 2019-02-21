import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'
import ProductGrid from '../components/ProductGrid'

const IndexPage = ({ data: { allMoltinProduct } }) => (
  <>
    <SEO title="All Products" />
    <PageTitle>All Products</PageTitle>
    <ProductGrid products={allMoltinProduct.edges} />
  </>
)

export const query = graphql`
  query allProductsQuery {
    allMoltinProduct {
      edges {
        node {
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
  }
`

export default IndexPage
