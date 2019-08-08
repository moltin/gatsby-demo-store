import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'
import ProductGrid from '../components/ProductGrid'

const IndexPage = ({ data: { allMoltinProduct } }) => (
  <>
    <SEO title="All Products" />
    <PageTitle>All Products</PageTitle>
    <ProductGrid
      products={allMoltinProduct.edges.map(({ node: product }) => product)}
    />
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
          mainImage {
            childImageSharp {
              fluid(maxWidth: 560) {
                ...GatsbyImageSharpFluid
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
