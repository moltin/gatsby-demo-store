import React from 'react'
import { graphql } from 'gatsby'

import Category from '../components/Category'
import CollectionHero from '../components/CollectionHero'

function IndexPage({
  data: {
    categories: { edges: categories },
    collections: { edges: collections }
  }
}) {
  const { node: collection } = collections[
    Math.floor(Math.random() * collections.length)
  ]

  return (
    <>
      <div className="hero overflow-y-hidden">
        {collection && <CollectionHero {...collection} />}
      </div>

      {categories && (
        <div className="flex flex-wrap -mx-6">
          {categories.map(({ node }) => (
            <Category key={node.id} {...node} />
          ))}
        </div>
      )}
    </>
  )
}

export const query = graphql`
  query IndexPageQuery {
    categories: allMoltinCategory {
      edges {
        node {
          name
          slug
          description
          products {
            name
            mainImage {
              childImageSharp {
                fixed(width: 560) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
    collections: allMoltinCollection {
      edges {
        node {
          name
          slug
          description
          products {
            mainImage {
              childImageSharp {
                fixed(width: 560) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
