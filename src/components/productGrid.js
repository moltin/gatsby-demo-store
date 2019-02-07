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
        <div key={product.id}>
          <Title>{product.name}</Title>
          {product.mainImage ? (
            <Img fixed={product.mainImage.childImageSharp.fixed} />
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
              id
              mainImage {
                childImageSharp {
                  fixed(width: 125) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
              name
            }
          }
        }
      }
    `}
    render={data => <ProductGrid data={data} />}
  />
)
