import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'
import ProductGrid from '../components/ProductGrid'

function CollectionPage({ data: { collection } }) {
  return (
    <React.Fragment>
      <SEO
        title={collection.meta_title || collection.name}
        description={collection.meta_description || collection.description}
      />

      <PageTitle title={collection.name} description={collection.description} />
      <ProductGrid products={collection.products} />
    </React.Fragment>
  )
}

export default CollectionPage

export const query = graphql`
  query($id: String!) {
    collection: moltinCollection(id: { eq: $id }) {
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
