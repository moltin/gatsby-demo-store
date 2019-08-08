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
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-black font-normal">
                The Moltin demo store
              </h1>
              <p className="mt-2">
                This is a Gatsby demo store, built using the source plugin to
                fetch products.
              </p>

              <p className="mt-2">
                Product, category and collection pages are statically generated,
                and all dynamic cart/checkout functionality happens dynamically
                with our JS SDKs.
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
  }
`

export default IndexPage
