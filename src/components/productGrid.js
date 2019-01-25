import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const ProductGrid = ({ data }) => (
  <>
    {data.allMoltinProduct.edges.map(({ node: product }) => {
      return (
        <div>
          <h1>{product.name}</h1>
          {product.fields ? (
            <Img fixed={product.fields.linkToMainImage.childImageSharp.fixed} />
          ) : null}
        </div>
      )
    })}
  </>
)

export default props => (
  <StaticQuery
    query={graphql`
      query ProductGridQuery {
        allMoltinProduct {
          edges {
            node {
              name
              fields {
                linkToMainImage {
                  childImageSharp {
                    fixed(width: 125) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <ProductGrid data={data} />}
  />
)
