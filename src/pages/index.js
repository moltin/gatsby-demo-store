import React from 'react'
import { graphql, Link } from 'gatsby'

import Category from '../components/Category'

function IndexPage({
  data: {
    categories: { edges: categories }
  }
}) {
  return (
    <>
      <div className="hero overflow-y-hidden">
        <div className="container relative">
          {/* <img
            src="http://localhost:8000/static/b103597cb29d58be491915f41328a444/f910a/f21d99f6-242f-4921-8fb8-1af677b83c2e.png"
            className="absolute pin-r"
          /> */}
          <div className="md:w-1/2">
            <div className="my-auto">
              <h1 className="text-2xl md:text-3xl lg:text-5xl text-black font-normal mb-4">
                The Collections
              </h1>
              <p>
                Abstract geometric lampshade and matching base creates a crisp
                modern-looking piece of art, rather than a typical boring lamp.
                Designed especially for those who love to stand out and shine.
              </p>

              <Link
                to={`/collections/top-picks`}
                className="inline-block appearance-none border border-b-3 border-black text-black mt-8 px-4 py-3 leading-tight rounded-none focus:outline-none my-2 no-underline"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
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
  }
`

export default IndexPage
