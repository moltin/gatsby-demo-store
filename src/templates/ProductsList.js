import React from 'react'
// import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'
import ProductGrid from '../components/ProductGrid'
import Pagination from '../components/Pagination'

function ProductsList({ pageContext }) {
  const { group, index, pageCount } = pageContext

  return (
    <>
      <SEO title="All Products" />
      <PageTitle>All Products</PageTitle>
      <ProductGrid products={group.map(({ node: product }) => product)} />
      <Pagination index={index} pageCount={pageCount} resource="products" />
    </>
  )
}

export default ProductsList

const query = graphql`
  query allProductsQuery {
    allMoltinProduct {
      edges {
        node {
          id
          name
          slug

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
