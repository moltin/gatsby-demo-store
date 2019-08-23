import React, { useContext } from 'react'
import cx from 'classnames'

import { LayoutContext } from '../context/LayoutContext'

function LayoutSwitcher() {
  const { showGrid, showList, isGrid, isList } = useContext(LayoutContext)

  const btnClass =
    'appearance-none focus:outline-none border border-grey-light ml-3 h-10 w-10 flex items-center justify-center'
  const gridBtnClass = cx(btnClass, {
    'bg-black text-white hover:text-white': isGrid,
    'bg-white text-black': isList
  })
  const listBtnClass = cx(btnClass, {
    'bg-black text-white hover:text-white': isList,
    'bg-white text-black': isGrid
  })

  return (
    <div className="flex justify-end">
      <div className="inline-flex items-center">
        <button className={gridBtnClass} onClick={showGrid}>
          <svg
            className="fill-current w-4 h-4"
            viewBox="0 0 341.333 341.333"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="grid"
          >
            <path d="m128 128h85.333v85.333h-85.333z" />
            <path d="m0 0h85.333v85.333h-85.333z" />
            <path d="m128 256h85.333v85.333h-85.333z" />
            <path d="m0 128h85.333v85.333h-85.333z" />
            <path d="m0 256h85.333v85.333h-85.333z" />
            <path d="m256 0h85.333v85.333h-85.333z" />
            <path d="m128 0h85.333v85.333h-85.333z" />
            <path d="m256 128h85.333v85.333h-85.333z" />
            <path d="m256 256h85.333v85.333h-85.333z" />
          </svg>
        </button>
        <button className={listBtnClass} onClick={showList}>
          <svg
            className="fill-current w-4 h-4"
            viewBox="0 0 560.414 560.415"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="List"
          >
            <path d="m115.65 24.92h-82.143c-18.476 0-33.507 15.031-33.507 33.501v82.143c0 18.477 15.031 33.501 33.507 33.501h82.143c18.476 0 33.501-15.031 33.501-33.501v-82.143c-.006-18.476-15.031-33.501-33.501-33.501z" />
            <path d="m526.908 24.92h-314.703c-18.477 0-33.501 15.031-33.501 33.501v82.143c0 18.477 15.025 33.501 33.501 33.501h314.703c18.477 0 33.506-15.031 33.506-33.501v-82.143c0-18.476-15.037-33.501-33.506-33.501z" />
            <path d="m115.65 205.632h-82.143c-18.476 0-33.507 15.031-33.507 33.501v82.143c0 18.476 15.031 33.5 33.507 33.5h82.143c18.476 0 33.501-15.024 33.501-33.5v-82.143c-.006-18.476-15.031-33.501-33.501-33.501z" />
            <path d="m526.908 205.632h-314.703c-18.477 0-33.501 15.031-33.501 33.501v82.143c0 18.476 15.025 33.5 33.501 33.5h314.703c18.477 0 33.506-15.024 33.506-33.5v-82.143c0-18.476-15.037-33.501-33.506-33.501z" />
            <path d="m115.65 386.343h-82.143c-18.476 0-33.507 15.031-33.507 33.507v82.143c0 18.477 15.031 33.501 33.507 33.501h82.143c18.476 0 33.501-15.024 33.501-33.501v-82.143c-.006-18.476-15.031-33.507-33.501-33.507z" />
            <path d="m526.908 386.343h-314.703c-18.477 0-33.501 15.03-33.501 33.507v82.143c0 18.477 15.025 33.501 33.501 33.501h314.703c18.477 0 33.506-15.024 33.506-33.501v-82.143c0-18.476-15.037-33.507-33.506-33.507z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default LayoutSwitcher
