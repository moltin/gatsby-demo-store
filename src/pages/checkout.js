import React from 'react'
import { Link } from 'gatsby'

import PageTitle from '../components/PageTitle'
import CartItemList from '../components/CartItemList'

export default function CartPage() {
  return (
    <React.Fragment>
      <PageTitle title="Checkout" />

      <div className="flex flex-wrap">
        <div className="py-2 w-full lg:w-2/3">hello</div>

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
