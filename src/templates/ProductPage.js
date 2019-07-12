import React from 'react'
import { graphql, withPrefix } from 'gatsby'

import SEO from '../components/SEO'
import Photo from '../components/Photo'
import Badge from '../components/Badge'
import AddToCart from '../components/AddToCart'
import useMoltinInventory from '../hooks/useMoltinInventory'

function ProductPage({ data: { product } }) {
  const [inventory, inventoryLoading, inventoryError] = useMoltinInventory(
    product
  )

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
              {product.on_sale && (
                <Badge color="green" className="mx-2">
                  On Sale
                </Badge>
              )}
              {!inventoryError &&
                (inventoryLoading ? (
                  <Badge className="mx-2"> Loading inventory</Badge>
                ) : (
                  <Badge
                    color={inventory.inStock ? 'green' : 'red'}
                    className="mx-2"
                  >
                    {inventory.inStock
                      ? product.manage_stock
                        ? `${inventory.available} in stock `
                        : 'In Stock'
                      : 'Out of stock'}
                  </Badge>
                ))}
            </span>
          </div>

          {inventoryError ? (
            inventoryError
          ) : (
            <div className="flex flex-wrap flex-col md:flex-row md:items-end">
              <AddToCart productId={product.id} disabled={!inventory.inStock} />
            </div>
          )}

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
      manage_stock
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
