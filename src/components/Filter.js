import React from 'react'
import { RefinementList } from 'react-instantsearch-dom'

function Filter() {
  return (
    <React.Fragment>
      <RefinementList attribute="categories" />
      <RefinementList attribute="brands" />
      <RefinementList attribute="collections" />
    </React.Fragment>
  )
}

export default Filter
