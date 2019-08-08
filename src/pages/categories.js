import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'
import ProductGrid from '../components/ProductGrid'

const CategoriesIndexPage = ({ data: { categories } }) => (
  <>
    <SEO title="All Categories" />

    {categories.nodes.map(category => (
      <section className="my-3 md:my-6" key={category.id}>
        <PageTitle description={category.description}>
          {category.name}
        </PageTitle>

        <ProductGrid products={category.products} />
      </section>
    ))}
  </>
)

export const query = graphql`
  query allCategoriesQuery {
    categories: allMoltinCategory {
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

export default CategoriesIndexPage
