import React from 'react'
import Link from 'gatsby-link'
// import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'
import ProductGrid from '../components/ProductGrid'

const NavLink = props => {
  if (!props.disable) {
    return <Link to={`products/${props.url}`}>{props.text}</Link>
  } else {
    return <span className="text-grey">{props.text}</span>
  }
}

function ProductsList({ pageContext }) {
  const { group, index, pageCount } = pageContext
  const previousUrl = index - 1 === 1 ? '/' : (index - 1).toString()
  const nextUrl = (index + 1).toString()

  return (
    <>
      <SEO title="All Products" />
      <PageTitle>All Products</PageTitle>
      <ProductGrid products={group.map(({ node: product }) => product)} />
      <div className="previousLink">
        <NavLink
          disable={index === 1}
          url={previousUrl}
          text="Go to Previous Page"
        />
      </div>
      <div className="nextLink">
        <NavLink
          disable={index === pageCount}
          url={nextUrl}
          text="Go to Next Page"
        />
      </div>
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
