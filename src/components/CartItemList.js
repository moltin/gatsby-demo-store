import React, { useContext } from 'react'

import { CartContext } from '../components/CartContext'
import CartItem from './CartItem'

export default function CartItemList(props) {
  const { isEmpty, items, meta, removeFromCart } = useContext(CartContext)

  if (isEmpty) return <p className="text-center">Your cart is empty</p>

  const subTotal = meta ? meta.display_price.without_tax.formatted : 0

  return (
    <div className="my-6">
      {items.map(item => (
        <CartItem
          key={item.id}
          removeFromCart={removeFromCart}
          {...item}
          {...props}
        />
      ))}

      <div className="border-t border-grey-light py-2 md:py-4 lg:py-6 w-full text-right">
        <div className="text-grey">Subtotal</div>
        <div className="text-black text-2xl lg:text-3xl font-semibold">
          {subTotal}
        </div>
      </div>
    </div>
  )
}
