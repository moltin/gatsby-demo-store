import React, { useState, useContext } from 'react'

import { CartContext } from '../components/CartContext'

export default function AddToCart({ productId }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useContext(CartContext)

  const increase = () => setQuantity(quantity + 1)
  const decrease = () => setQuantity(quantity - 1)

  console.log(quantity)

  return (
    <div className="inline-flex">
      <div className="inline-flex items-center mr-5">
        {quantity > 1 && (
          <button
            onClick={decrease}
            className="inline-block appearance-none border-2 border-black text-black px-4 py-3 leading-tight rounded-none focus:outline-none my-2"
          >
            -
          </button>
        )}
        <span className="inline-block px-4">{quantity}</span>
        <button
          onClick={increase}
          className="inline-block appearance-none border-2 border-black text-black px-4 py-3 leading-tight rounded-none focus:outline-none my-2"
        >
          +
        </button>
      </div>
      <button
        onClick={() => addToCart(productId, quantity)}
        className="inline-block appearance-none bg-black border border-black text-white px-4 py-3 leading-tight rounded-none focus:outline-none my-2"
      >
        Add to Cart
      </button>
    </div>
  )
}
