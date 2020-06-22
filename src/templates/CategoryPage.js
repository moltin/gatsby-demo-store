import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'
import ProductGrid from '../components/ProductGrid'
import Pagination from '../components/Pagination'
import Category from '../components/Category'

function CategoryPage({ data: { category, categories : { edges: categories }, products }, pageContext }) {
  const {
    humanPageNumber,
    numberOfPages,
    nextPagePath,
    previousPagePath
  } = pageContext

  const childCategories = category.relationships.children && category.relationships.children.data.map(child => categories.find(cat => cat.node.id === child.id));

  return (
    <>
      <SEO
        title={category.meta_title || category.name}
        description={category.meta_description || category.description}
      />

      <PageTitle title={category.name} description={category.description} />
      {childCategories && (
        <div className="flex flex-wrap -mx-6">
          {childCategories.map(({ node }) => (
            <Category key={node.id} {...node} />
          ))}
        </div>
      )}
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
      relationships {
        children {
          data {
            id
          }
        }
        parent {
          data {
            id
          }
        }
      }
    }

    categories: allMoltinCategory {
      edges {
        node {
          id
          name
          slug
          description
          products {
            name
            mainImage {
              childImageSharp {
                fluid(maxWidth: 560) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
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
