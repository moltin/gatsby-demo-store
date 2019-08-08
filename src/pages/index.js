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
          <div className="w-full md:w-2/3 lg:w-1/2 py-12 px-8 md:px-0">
            <div className="text-center md:text-left md:my-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-black font-normal mb-4">
                The Alchémist Collection
              </h1>
              <p>
                The perfect lighting scheme is made up of a variety of different
                lamps, for both form and function. Start with a pair of table
                lamps either side of a bed or sofa, but when there’s no space to
                fit a side table, consider a floor lamp or wall lamps instead.
              </p>

              <Link
                to={`/products`}
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
                fluid(maxWidth: 560) {
                  ...GatsbyImageSharpFluid
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
