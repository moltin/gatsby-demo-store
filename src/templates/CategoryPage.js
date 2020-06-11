import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'
import ProductGrid from '../components/ProductGrid'
import Pagination from '../components/Pagination'

function CategoryPage({ data: { category, products }, pageContext }) {
  const {
    humanPageNumber,
    numberOfPages,
    nextPagePath,
    previousPagePath
  } = pageContext

  return (
    <>
      <SEO
        title={category.meta_title || category.name}
        description={category.meta_description || category.description}
      />

      <PageTitle title={category.name} description={category.description} />
      <ProductGrid products={products.nodes} />
      <Pagination
        currentPage={humanPageNumber}
        numberOfPages={numberOfPages}
        nextPagePath={nextPagePath}
        previousPagePath={previousPagePath}
        resource={`categories/${category.slug}`}
      />
    </>
  )
}

export default CategoryPage

export const query = graphql`
  query($id: String!, $limit: Int!, $skip: Int!) {
    category: moltinCategory(id: { eq: $id }) {
      id
      slug
      name
      description
    }

    products: allMoltinProduct(
      filter: {
        categories: { elemMatch: { id: { eq: $id } } },
        parent: {id: {eq: null}}
    }
      limit: $limit
      skip: $skip
    ) {
      nodes {
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
`
