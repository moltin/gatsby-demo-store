import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'
import ProductGrid from '../components/ProductGrid'

function CollectionPage({ data: { category } }) {
  return (
    <React.Fragment>
      <SEO
        title={category.meta_title || category.name}
        description={category.meta_description || category.description}
      />

      <PageTitle title={category.name} description={category.description} />
      <ProductGrid products={category.products} />
    </React.Fragment>
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
