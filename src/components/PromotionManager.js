import React, { useContext } from 'react'

import { Cartkit } from '../shopkit'

import Promotion from './Promotion'
import PromotionForm from './PromotionForm'

export default function PromotionManager({ locked }) {
  const { promotionItems, addPromotion, removePromotion } = useContext(Cartkit)

  const promotionActive = !!promotionItems.length
  const [promotion] = promotionItems

  return (
    <div className="border-t border-grey-light flex items-center justify-end pb-6 md:pb-8 lg:pb-6">
      {promotionActive ? (
        <Promotion
          {...promotion}
          removePromotion={removePromotion}
          locked={locked}
        />
      ) : (
        <PromotionForm addPromotion={addPromotion} />
      )}
    </div>
  )
}
