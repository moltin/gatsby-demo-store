import React, { useContext } from 'react'
import { Link } from 'gatsby'

import { CartContext } from '../context'
import PageTitle from '../components/PageTitle'
import CartItemList from '../components/CartItemList'

export default function CartPage() {
  const { isEmpty } = useContext(CartContext)

  return (
    <React.Fragment>
      <PageTitle title="Shopping Cart" />
      <CartItemList />

      {!isEmpty && (
        <div className="flex justify-end">
          <Link
            to="/checkout"
            className="inline-block appearance-none bg-black border border-black text-white hover:text-white px-4 py-3 leading-tight rounded-none focus:outline-none my-2 no-underline"
          >
            Continue to checkout
          </Link>
        </div>
      )}
    </React.Fragment>
  )
}
