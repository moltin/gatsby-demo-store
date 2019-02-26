import React, { useContext } from 'react'

import { CartContext } from './Cartkit'
import CartItem from './CartItem'

export default function CartItemList(props) {
  const { isEmpty, cartItems, meta, removeFromCart } = useContext(CartContext)
  // addPromotion, promotionItems

  if (isEmpty) return <p className="text-center">Your cart is empty</p>

  const subTotal = meta ? meta.display_price.without_tax.formatted : 0

  return (
    <div className="">
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          removeFromCart={removeFromCart}
          {...item}
          {...props}
        />
      ))}

      {/* <button onClick={() => addPromotion('DEF')}>Add Promotion</button>

      {promotionItems.map(promotion => (
        <div>
          <h4>{promotion.name}</h4>
          <p>Code used: {promotion.sku}</p>
          <button onClick={() => removeFromCart(promotion.id)}>
            Remove promotion
          </button>
        </div>
      ))} */}

      <div className="border-t border-grey-light pt-2 md:pt-4 lg:pt-6 w-full text-right">
        <div className="text-grey">Subtotal</div>
        <div className="text-black text-2xl lg:text-3xl font-semibold">
          {subTotal}
        </div>
      </div>
    </div>
  )
}
