import React, { useState } from 'react'
import classNames from 'classnames'
import QuantityStepper from './QuantityStepper'

// import Photo from './Photo'

function CartItem({
  id,
  product_id,
  name,
  sku,
  quantity,
  meta,
  image: { href: src },
  removeFromCart,
  locked
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
    'border-t border-grey-light py-2 md:py-4 lg:py-6 flex items-center',
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
      <div className="w-full flex justify-between items-center">
        <div>
          <div className="text-black">{name}</div>
          <div className="text-grey text-sm">{sku}</div>
        </div>

        <div className="flex items-center justify-between">
          {!locked && (
            <div className="hidden md:block">
              <QuantityStepper itemId={id} quantity={quantity} />
            </div>
          )}

          <div className="md:w-1/2 text-right">
            <div className="text-black">{value}</div>
            {quantity > 1 && (
              <div className="text-grey text-sm md:text-base">
                <span className="md:hidden">{quantity} x </span>
                {unit} <span className="hidden md:inline-block">each</span>
              </div>
            )}
          </div>

          {!locked && (
            <button
              className="text-black text-2xl md:text-3xl font-semibold ml-4 md:ml-6"
              onClick={onRemove}
            >
              &times;
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartItem
