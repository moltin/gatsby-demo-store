import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'
import ProductGrid from '../components/ProductGrid'
import Pagination from '../components/Pagination'

function ProductsList({ data: { allMoltinProduct }, pageContext }) {
  const {
    humanPageNumber,
    numberOfPages,
    nextPagePath,
    previousPagePath
  } = pageContext

  return (
    <>
      <SEO title="All Products" />
      <PageTitle>All Products</PageTitle>
      <ProductGrid
        products={allMoltinProduct.edges.map(({ node: product }) => product)}
      />
      <Pagination
        currentPage={humanPageNumber}
        numberOfPages={numberOfPages}
        nextPagePath={nextPagePath}
        previousPagePath={previousPagePath}
        resource="products"
      />
    </>
  )
}

export default ProductsList

export const query = graphql`
  query allProductsQuery($limit: Int!, $skip: Int!) {
    allMoltinProduct(limit: $limit, skip: $skip, filter: {parent: {id: {eq: null}}}) {
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
