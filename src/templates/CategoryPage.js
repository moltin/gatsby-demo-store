import React from 'react'
import { graphql } from 'gatsby'

import PageTitle from '../components/PageTitle'

function CollectionPage({ data: { category } }) {
  return (
    <>
      <PageTitle title={category.name} description={category.description} />
      {/* <ProductGrid products={products} /> */}
    </>
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
    }
  }
`
