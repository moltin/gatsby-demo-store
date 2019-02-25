import React from 'react'
import { Link } from 'gatsby'

import PageTitle from '../components/PageTitle'
import CartItemList from '../components/CartItemList'

export default function CartPage() {
  return (
    <React.Fragment>
      <PageTitle title="Shopping Cart" />
      <CartItemList />

      <Link
        to="/checkout"
        className="inline-block appearance-none bg-black border border-black text-white hover:text-white px-4 py-3 leading-tight rounded-none focus:outline-none my-2 no-underline"
      >
        Continue to checkout
      </Link>
    </React.Fragment>
  )
}
