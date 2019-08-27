import React from 'react'
import { Hits } from 'react-instantsearch-dom'

import Hit from './Hit'

function HitList() {
  return (
    <div>
      <Hits hitComponent={Hit} />
    </div>
  )
}

export default HitList
