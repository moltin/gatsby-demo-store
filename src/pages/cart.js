import React, { useContext } from 'react'
import { Link } from 'gatsby'

import { CartContext } from '../components/CartContext'
import PageTitle from '../components/PageTitle'
import CartItemList from '../components/CartItemList'

const CartPage = () => {
  const { items, meta, removeFromCart } = useContext(CartContext)

  const subTotal = meta ? meta.display_price.without_tax.formatted : 0

  return (
    <React.Fragment>
      <PageTitle title="Cart" />
      <CartItemList items={items} removeFromCart={removeFromCart} />

      <div className="w-full flex items-center justify-between">
        <Link
          to="/checkout"
          className="inline-block appearance-none bg-black border border-black text-white px-4 py-3 leading-tight rounded-none focus:outline-none my-2 no-underline"
        >
          Continue to checkout
        </Link>

        <div className="text-right">
          <div className="text-grey">Subtotal</div>
          <div className="text-black text-3xl font-semibold">{subTotal}</div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CartPage
