import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import Photo from '../components/Photo'
import AddToCart from '../components/AddToCart'

function ProductPage({ data: { product, site } }) {
  const {
    meta: { display_price }
  } = product

  return (
    <React.Fragment>
      <SEO
        title={product.meta_title || product.name}
        description={product.meta_description || product.description}
        image={`${site.siteMetadata.url}${product.mainImage.publicURL}`}
      />

      <div className="flex flex-wrap md:bg-grey-light">
        <div className="py-2 md:py-5 md:px-5 w-full lg:w-1/2">
          <div className="sticky pin-t">
            <Photo
              src={product.mainImage}
              alt={product.main_image_alt_text || product.name}
            />
          </div>
        </div>

        <div className="py-2 md:py-5 md:px-5 md:pr-10 w-full lg:w-1/2">
          <div className="my-2 flex flex-col md:flex-col-reverse">
            <h1 className="text-3xl md:text-5xl text-black font-normal">
              {product.name}
            </h1>

            <span className="block text-grey text-xl md:my-2 md:mt-8">
              {display_price.without_tax.formatted}
            </span>
          </div>

          <div className="flex flex-wrap flex-col md:flex-row md:items-end">
            <AddToCart productId={product.id} />
          </div>

          <div className="my-2 md:my-5">
            <h4 className="hidden md:block text-lg text-black font-bold my-2">
              Description
            </h4>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProductPage

export const query = graphql`
  query($id: String!) {
    product: moltinProduct(id: { eq: $id }) {
      id
      slug
      name
      description
      mainImage {
        childImageSharp {
          fixed(width: 560) {
            ...GatsbyImageSharpFixed
          }
        }
        publicURL
      }
      meta {
        display_price {
          without_tax {
            formatted
          }
        }
      }
      meta_title
      meta_description
    }
    site {
      siteMetadata {
        url
      }
    }
  }
`
