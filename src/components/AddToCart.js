import React, { useState, useContext } from 'react'

import { CartContext } from '../context'

export default function AddToCart({ disabled, productId }) {
  const { addToCart } = useContext(CartContext)
  const [quantity, setQuantity] = useState(1)

  function updateQuantity({ target: { value } }) {
    setQuantity(value)
  }

  function handleAddToCart() {
    addToCart(productId, parseInt(quantity, 10))
  }

  return (
    <div className="inline-flex my-2">
      <span
        className="moltin-buy-button sk-button inline-block appearance-none bg-black border border-black text-white py-1 leading-tight rounded-none focus:outline-none"
        data-moltin-product-id={productId}
      ></span>
    </div>
  )
}
