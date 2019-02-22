import React, { useState, useContext } from 'react'

import { CartContext } from '../components/CartContext'

export default function AddToCart({ productId }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useContext(CartContext)

  return (
    <div className="inline-flex">
      <button
        onClick={() => addToCart(productId, quantity)}
        className="inline-block appearance-none bg-black border border-black text-white px-4 py-3 leading-tight rounded-none focus:outline-none my-2"
      >
        Add to Cart
      </button>
    </div>
  )
}
