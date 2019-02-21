import React, { useState } from 'react'
import classNames from 'classnames'

// import Photo from './Photo'

function CartItem({
  id,
  product_id,
  name,
  sku,
  quantity,
  meta,
  image: { href: src },
  removeFromCart
}) {
  // const images = [{ id: product_id, src }]
  const {
    display_price: {
      without_tax: {
        unit: { formatted: unit },
        value: { formatted: value }
      }
    }
  } = meta
  const [removing, setRemoving] = useState(false)

  const klass = classNames(
    'border-b border-grey-light py-6 flex items-center',
    {
      'opacity-50': removing
    }
  )

  async function onRemove() {
    await setRemoving(true)
    await removeFromCart(id)
  }

  return (
    <div className={klass}>
      <div className="w-16 md:w-32 mr-4 md:mr-6">
        {/* <Photo images={images} /> */}
      </div>
      <div className="w-full flex items-center">
        <div className="mr-auto">
          <div className="text-black md:text-lg font-semibold">{name}</div>
          <div className="text-grey text-sm">{sku}</div>
        </div>

        <div className="w-1/3 flex items-center justify-between">
          <div className="w-1/2">{quantity}</div>

          <div className="w-1/2 text-right">
            <div className="text-black font-semibold text-lg">{value}</div>
            {quantity > 1 && <div className="text-grey">{unit} each</div>}
          </div>

          <button
            className="text-black font-semibold ml-4 md:ml-6"
            onClick={onRemove}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
