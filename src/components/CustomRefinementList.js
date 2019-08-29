import React from 'react'
import { RefinementList } from 'react-instantsearch-dom'

function CustomRefinementList({ title, ...props }) {
  return (
    <div className="py-6">
      <h4 className="text-black text font-bold mb-3">{title}</h4>

      <RefinementList {...props} />
    </div>
  )
}

export default CustomRefinementList
