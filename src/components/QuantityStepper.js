import React, { useContext } from 'react'

import { CartContext } from '../components/CartContext'

export default function QuantityStepper({ itemId, quantity }) {
  const { updateQuantity } = useContext(CartContext)

  const increase = () => updateQuantity(itemId, quantity + 1)
  const decrease = () => updateQuantity(itemId, quantity - 1)

  return (
    <div className="flex justify-between items-center mr-5">
      <button
        onClick={decrease}
        className="inline-block appearance-none border-2 border-black text-black px-4 py-3 leading-tight rounded-none focus:outline-none my-2"
      >
        -
      </button>

      <span className="inline-block px-4">{quantity}</span>
      <button
        onClick={increase}
        className="inline-block appearance-none border-2 border-black text-black px-4 py-3 leading-tight rounded-none focus:outline-none my-2"
      >
        +
      </button>
    </div>
  )
}
