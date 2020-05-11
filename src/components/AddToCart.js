import React, { useState, useContext } from 'react'

import { CartContext } from '../context'
import Select from '../components/Select'
import VariationsSelector from './VariationsSelector'

export default function AddToCart({ disabled, product }) {
  const { addToCart } = useContext(CartContext)
  const [quantity, setQuantity] = useState(1)

  const { id } = product
  const [productId, setProductId] = useState(id)

  function updateQuantity({ target: { value } }) {
    setQuantity(value)
  }

  function handleAddToCart() {
    addToCart(productId, parseInt(quantity, 10))
  }

  function handleVariationChange(childID) {
    setProductId(childID)
  }

  return (
    <div className="my-2">
      <VariationsSelector product={product} onChange={handleVariationChange} />
      <div className="inline-flex">
        <Select
          options={new Array(10)
            .fill(0)
            .map((v, k) => k + 1)
            .map(i => ({ id: i, name: i }))}
          defaultValue={1}
          onChange={updateQuantity}
          disabled={disabled}
        />

        <button
          onClick={handleAddToCart}
          className="inline-block appearance-none bg-black border border-black text-white px-4 py-3 leading-tight rounded-none focus:outline-none ml-2"
          disabled={disabled}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
