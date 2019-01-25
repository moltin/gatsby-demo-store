/* global tw */
import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const Title = styled.h1`
  ${tw`text-xl`}
`

const ProductGrid = ({ data }) => (
  <>
    {data.allMoltinProduct.edges.map(({ node: product }) => {
      return (
        <div>
          <Title>{product.name}</Title>
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
