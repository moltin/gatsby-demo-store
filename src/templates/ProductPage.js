import React, { useContext, useEffect, useState } from 'react'
import { graphql, withPrefix } from 'gatsby'

import SEO from '../components/SEO'
import Photo from '../components/Photo'
import Badge from '../components/Badge'
import AddToCart from '../components/AddToCart'
import { Shopkit } from '../shopkit'

function ProductPage({ data: { product } }) {
  const { moltin } = useContext(Shopkit)
  const [availableCount, setAvailableCount] = useState(0)
  const [inventoryLoading, setInventoryLoading] = useState(true)
  const [inventoryError, setInventoryError] = useState(false)

  useEffect(() => {
    async function getProductInventory() {
      try {
        const {
          data: { available }
        } = await moltin.get(`inventories/${product.id}`)

        setInventoryLoading(false)
        setAvailableCount(available)
      } catch (error) {
        setInventoryError(error)
      }
    }

    getProductInventory()
  }, [])

  const {
    meta: { display_price }
  } = product

  return (
    <React.Fragment>
      <SEO
        type="product"
        title={product.meta_title || product.name}
        description={product.meta_description || product.description}
        image={withPrefix(product.mainImage.childImageSharp.fixed.src)}
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

            <span className="block text-grey text-xl md:my-2 md:mt-8 inline-flex items-center">
              {display_price.without_tax.formatted}
              {product.on_sale && <Badge color="green">On Sale</Badge>}
            </span>
          </div>

          <div className="flex flex-wrap flex-col md:flex-row md:items-end">
            <AddToCart productId={product.id} />
          </div>

          <div className="my-2 md:my-5">
            <h4 className="text-lg text-black font-bold my-2">
              {inventoryError ? (
                inventoryError
              ) : inventoryLoading ? (
                'Loading inventory'
              ) : (
                <Badge color={availableCount === 0 ? 'red' : 'green'}>
                  {availableCount} available
                </Badge>
              )}
            </h4>
          </div>

          <div className="my-2 md:my-5">
            <h4 className="hidden md:block text-lg text-black font-bold my-2">
              Description
            </h4>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap my-12 md:-mx-3">
        <div className="my-3 md:my-0 md:px-3 w-full lg:w-1/3">
          <div className="border border-bg-grey-light">
            <div className="bg-grey-light font-medium text-center p-3">
              Details
            </div>
            <div className="px-3 py-1">
              {product.bulb && (
                <div className="flex py-2">
                  <div className="w-1/3 text-black">Bulb</div>
                  <div className="w-2/3 text-grey">{product.bulb}</div>
                </div>
              )}

              {product.bulb_qty && (
                <div className="flex py-2">
                  <div className="w-1/3 text-black">Bulb Qty</div>
                  <div className="w-2/3 text-grey">{product.bulb_qty}</div>
                </div>
              )}

              {product.max_watt && (
                <div className="flex py-2">
                  <div className="w-1/3 text-black">Max Watt.</div>
                  <div className="w-2/3 text-grey">{product.max_watt}</div>
                </div>
              )}

              {product.material && (
                <div className="flex py-2">
                  <div className="w-1/3 text-black">Material</div>
                  <div className="w-2/3 text-grey">{product.material}</div>
                </div>
              )}

              {product.finish && (
                <div className="flex py-2">
                  <div className="w-1/3 text-black">Finish</div>
                  <div className="w-2/3 text-grey">{product.finish}</div>
                </div>
              )}

              {product.sku && (
                <div className="flex py-2">
                  <div className="w-1/3 text-black">SKU</div>
                  <div className="w-2/3 text-grey">{product.sku}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="my-3 md:my-0 md:px-3 w-full lg:w-1/3">
          <div className="border border-bg-grey-light">
            <div className="bg-grey-light font-medium text-center p-3">
              Shipping
            </div>
            <div className="px-3 py-1">
              <div className="flex py-2">
                <div className="w-1/3">Dispatch</div>
                <div className="w-2/3">1&mdash;2 weeks</div>
              </div>

              <div className="flex py-2">
                <div className="w-1/3">Delivery Cost</div>
                <div className="w-2/3" />
              </div>
            </div>
          </div>
        </div>

        <div className="my-3 md:my-0 md:px-3 w-full lg:w-1/3">
          <div className="border border-bg-grey-light">
            <div className="bg-grey-light font-medium text-center p-3">
              Shipping
            </div>
            <div className="px-3 py-1">
              <div className="flex py-2">
                <div className="w-1/3">Dispatch</div>
                <div className="w-2/3">1&mdash;2 weeks</div>
              </div>

              <div className="flex py-2">
                <div className="w-1/3">Delivery Cost</div>
                <div className="w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export const query = graphql`
  query($id: String!) {
    product: moltinProduct(id: { eq: $id }) {
      id
      slug
      name
      description
      sku
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
      on_sale
      bulb
      bulb_qty
      material
      finish
      max_watt
    }
  }
`

export default ProductPage
