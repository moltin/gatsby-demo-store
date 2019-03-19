import React, { useContext } from 'react'

import { CartContext } from './Cartkit'

import Promotion from './Promotion'
import PromotionForm from './PromotionForm'

export default function PromotionManager({ locked }) {
  const { promotionItems, addPromotion, removeFromCart } = useContext(
    CartContext
  )

  const promotionActive = !!promotionItems.length
  const [promotion] = promotionItems

  return (
    <div className="border-t border-grey-light flex items-center justify-end pb-6 md:pb-8 lg:pb-6">
      {promotionActive ? (
        <Promotion
          {...promotion}
          removeFromCart={removeFromCart}
          locked={locked}
        />
      ) : (
        <PromotionForm addPromotion={addPromotion} />
      )}
    </div>
  )
}
