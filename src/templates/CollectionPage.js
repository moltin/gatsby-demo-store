import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'
import ProductGrid from '../components/ProductGrid'
import Pagination from '../components/Pagination'

function CollectionPage({ data: { collection, products }, pageContext }) {
  const {
    humanPageNumber,
    numberOfPages,
    nextPagePath,
    previousPagePath
  } = pageContext

  return (
    <>
      <SEO
        title={collection.meta_title || collection.name}
        description={collection.meta_description || collection.description}
      />

      <PageTitle title={collection.name} description={collection.description} />
      <ProductGrid products={products.nodes} />
      <Pagination
        currentPage={humanPageNumber}
        numberOfPages={numberOfPages}
        nextPagePath={nextPagePath}
        previousPagePath={previousPagePath}
        resource={`collections/${collection.slug}`}
      />
    </>
  )
}

export default CollectionPage

export const query = graphql`
  query($id: String!, $limit: Int!, $skip: Int!) {
    collection: moltinCollection(id: { eq: $id }) {
      id
      slug
      name
      description
    }

    products: allMoltinProduct(
      filter: { 
        collections: { 
          elemMatch: { id: { eq: $id } } },
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
