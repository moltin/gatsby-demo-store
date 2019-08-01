import React, { useContext } from 'react'

import { CartContext } from '../context'
import CartItem from './CartItem'
import PromotionManager from './PromotionManager'

export default function CartItemList(props) {
  const {
    isEmpty,
    cartItems,
    subTotal,
    removeFromCart,
    regulated
  } = useContext(CartContext)

  if (isEmpty) return <p className="text-center">Your cart is empty</p>

  return (
    <div>
      {regulated && (
        <p className="bg-red text-white p-1 text-center text-sm leading-loose mb-3">
          Due to the <strong>{regulated.name}</strong> item in your cart you
          will need to provide some further verification to complete your order.
        </p>
      )}

      {cartItems.map(item => (
        <CartItem
          key={item.id}
          removeFromCart={removeFromCart}
          {...item}
          {...props}
        />
      ))}

      <PromotionManager locked={props.locked} />

      <div className="border-t border-grey-light pt-2 md:pt-4 lg:pt-6 w-full text-right">
        <div className="text-grey">Subtotal</div>
        <div className="text-black text-2xl lg:text-3xl font-semibold">
          {subTotal}
        </div>
      </div>
    </div>
  )
}
