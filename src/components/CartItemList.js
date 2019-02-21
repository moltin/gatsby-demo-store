import React, { useContext } from 'react'

import { CartContext } from '../components/CartContext'
import CartItem from './CartItem'

export default function CartItemList() {
  const { items, removeFromCart } = useContext(CartContext)

  if (!items) return <p>Your cart is empty</p>

  return (
    <div className="my-6">
      {items.map(item => (
        <CartItem key={item.id} removeFromCart={removeFromCart} {...item} />
      ))}
    </div>
  )
}
