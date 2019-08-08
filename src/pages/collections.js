import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'
import ProductGrid from '../components/ProductGrid'

const CollectionIndexPage = ({ data: { collections } }) => (
  <>
    <SEO title="All Collections" />

    {collections.nodes.map(collection => (
      <section className="my-3 md:my-6" key={collection.id}>
        <PageTitle description={collection.description}>
          {collection.name}
        </PageTitle>

        <ProductGrid products={collection.products} />
      </section>
    ))}
  </>
)

export const query = graphql`
  query allCollectionsQuery {
    collections: allMoltinCollection {
      nodes {
        id
        name
        description
        slug
        products {
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

export default CollectionIndexPage
