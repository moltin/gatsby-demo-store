import React, { useContext } from 'react'
import { Form } from 'react-final-form'

import { CartContext } from './Cartkit'
import Input from './Input'

import validation from '../validation/promotion'

export default function PromotionManager({ locked }) {
  const { promotionItems, addPromotion, removeFromCart } = useContext(
    CartContext
  )

  const promotionActive = !!promotionItems.length
  const [promotion] = promotionItems

  function showPromotions() {
    return (
      <div className="pt-6 md:pt-8 lg:pt-6">
        <span className="text-grey">
          Promotion applied:{' '}
          <pre className="border border-black text-black p-1 inline font-mono text-sm">
            {promotion.sku}
          </pre>
        </span>

        {!locked && (
          <button
            className="text-black ml-4 md:ml-6"
            onClick={() => removeFromCart(promotion.id)}
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

  function showForm() {
    return (
      <Form validate={validation} onSubmit={({ code }) => addPromotion(code)}>
        {({ handleSubmit, submitting, invalid }) => (
          <form onSubmit={handleSubmit}>
            <div className="inline-flex">
              <Input name="code" placeholder='Try "SAVE50"' />
              <button
                type="submit"
                className="appearance-none bg-black border border-black text-white hover:text-white px-4 py-3 leading-tight rounded-none focus:outline-none ml-3 mt-6 no-underline"
                disabled={submitting || invalid}
              >
                Add code
              </button>
            </div>
          </form>
        )}
      </Form>
    )
  }

  return (
    <div className="border-t border-grey-light flex items-center justify-end pb-6 md:pb-8 lg:pb-6">
      {promotionActive ? showPromotions() : showForm()}
    </div>
  )
}
