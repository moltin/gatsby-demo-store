import React from 'react'

import Badge from './Badge'

export default function Promotion({ id, sku, locked, removePromotion }) {
  return (
    <div className="pt-6 md:pt-8 lg:pt-6">
      <span className="text-black inline-flex items-center">
        Promotion applied:
        <Badge color="green" className="mx-2">
          {sku}
        </Badge>
      </span>

      {!locked && (
        <button
          className="text-black ml-4 md:ml-6"
          onClick={() => removePromotion(id)}
        >
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
  )
}
