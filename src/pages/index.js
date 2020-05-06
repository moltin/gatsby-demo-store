import React from 'react'
import { graphql, Link } from 'gatsby'
import BrandedStrings from '../strings/BrandedStrings.json'

import Category from '../components/Category'

function IndexPage({
  data: {
    categories: { edges: categories }
  }
}) {
  return (
    <>
      <div className="hero overflow-y-hidden overflow-x-hidden front-banner">
        <div className="container relative">
          <div>
            <div className="banner-box text-center md:text-left md:my-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal">
                {BrandedStrings['front-title']}
              </h1>
              <p className="mt-2">{BrandedStrings['front-paragraph-1']}</p>

              <p className="mt-2">{BrandedStrings['front-paragraph-2']}</p>

              <Link
                to={`/products`}
                className="primary-btn inline-block appearance-none border border-b-3 border-black text-black mt-8 px-4 py-3 leading-tight rounded-none focus:outline-none my-2 no-underline"
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
