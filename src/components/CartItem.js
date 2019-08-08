import React, { useState } from 'react'
import classNames from 'classnames'
import QuantityStepper from './QuantityStepper'

import Photo from './Photo'

function CartItem({
  id,
  name,
  sku,
  quantity,
  meta,
  image: { href },
  removeFromCart,
  locked
}) {
  const {
    display_price: {
      without_tax: {
        unit: { formatted: unit },
        value: { formatted: value }
      }
    }
  } = meta
  const [removing, setRemoving] = useState(false)

  const klass = classNames('border-t border-grey-light flex items-center', {
    'opacity-50': removing,
    'py-2 md:py-4 lg:py-6': !locked,
    'py-4': locked
  })

  async function onRemove() {
    await setRemoving(true)
    await removeFromCart(id)
  }

  return (
    <div className={klass}>
      <div
        className={classNames('mr-3 md:mr-6', {
          'w-16 md:w-32': !locked,
          'w-8 md:w-16': locked
        })}
      >
        <Photo cartImg src={href} alt={name} />
      </div>

      <div className="w-full flex justify-between items-center">
        <div>
          <div className="text-black">{name}</div>
          <div className="text-grey text-sm">{sku}</div>
        </div>

        <div className="flex items-center justify-end md:w-1/2">
          {!locked && (
            <div className="hidden md:block">
              <QuantityStepper itemId={id} quantity={quantity} />
            </div>
          )}

          <div className="md:w-1/2 text-right">
            <div className="text-black">{value}</div>
            {quantity > 1 && (
              <div className="text-grey text-sm">
                <span className="md:hidden">{quantity} x </span>
                {unit} <span className="hidden md:inline-block">each</span>
              </div>
            )}
          </div>

          {!locked && (
            <button className="text-black ml-4 md:ml-6" onClick={onRemove}>
              <svg
                className="fill-current w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 12"
              >
                <path
                  d="M8.54538034,10 L4.3012616,5.75588126 C3.89957947,5.35419913 3.89957947,4.70294373 4.3012616,4.3012616 C4.70294373,3.89957947 5.35419913,3.89957947 5.75588126,4.3012616 L10,8.54538034 L14.2441187,4.3012616 C14.6458009,3.89957947 15.2970563,3.89957947 15.6987384,4.3012616 C16.1004205,4.70294373 16.1004205,5.35419913 15.6987384,5.75588126 L11.4546197,10 L15.6987384,14.2441187 C16.1004205,14.6458009 16.1004205,15.2970563 15.6987384,15.6987384 C15.2970563,16.1004205 14.6458009,16.1004205 14.2441187,15.6987384 L10,11.4546197 L5.75588126,15.6987384 C5.35419913,16.1004205 4.70294373,16.1004205 4.3012616,15.6987384 C3.89957947,15.2970563 3.89957947,14.6458009 4.3012616,14.2441187 L8.54538034,10 Z"
                  transform="translate(-4 -4)"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartItem
