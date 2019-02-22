import React, { useContext } from 'react'
import { Link } from 'gatsby'

import { CartContext } from '../components/Cartkit'

import PageTitle from '../components/PageTitle'
import CartItemList from '../components/CartItemList'

export default function CartPage() {
  const { addPromotion, promotionItems, removeFromCart } = useContext(
    CartContext
  )

  return (
    <React.Fragment>
      <PageTitle title="Checkout" />

      <div className="flex flex-wrap">
        <div className="py-2 w-full lg:w-2/3">
          <h2>Promotions</h2>
          <button onClick={() => addPromotion('DEF')}>Add Promotion</button>

          {promotionItems.map(promotion => (
            <div>
              <h4>{promotion.name}</h4>
              <p>Code used: {promotion.sku}</p>
              <button onClick={() => removeFromCart(promotion.id)}>
                Remove promotion
              </button>
            </div>
          ))}
        </div>

        <div className="py-2 w-full lg:w-1/3">
          <div className="md:bg-grey-lightest p-5">
            <CartItemList locked />
          </div>
        </div>
      </div>

      <Link
        to="/checkout"
        className="inline-block appearance-none bg-black border border-black text-white px-4 py-3 leading-tight rounded-none focus:outline-none my-2 no-underline"
      >
        Continue to checkout
      </Link>
    </React.Fragment>
  )
}
