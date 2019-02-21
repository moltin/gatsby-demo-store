import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import ProductGrid from '../components/ProductGrid'

const IndexPage = ({ data: { allMoltinProduct } }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <ProductGrid products={allMoltinProduct.edges} />
  </Layout>
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
    }
  }
`

export default IndexPage
