import React, { useReducer } from 'react'

import { LayoutContext } from '../context/LayoutContext'

function reducer(state, { type }) {
  switch (type) {
    case 'SET_LIST':
      return {
        layout: 'list'
      }
    case 'SET_GRID':
      return {
        layout: 'grid'
      }
    default:
      return {
        ...state
      }
  }
}

const LayoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    layout: 'grid'
  })

  function toggleLayout() {
    dispatch({ type: state.layout === 'grid' ? 'SET_LIST' : 'SET_GRID' })
  }

  function showGrid() {
    dispatch({ type: 'SET_GRID' })
  }

  function showList() {
    dispatch({ type: 'SET_LIST' })
  }

  return (
    <LayoutContext.Provider
      value={{
        ...state,
        isList: state.layout === 'list',
        isGrid: state.layout === 'grid',
        toggleLayout,
        showGrid,
        showList
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export default LayoutProvider
