import React from 'react'
import classNames from 'classnames'

export default function Badge({ color, children }) {
  const klassNames = classNames(
    'inline-block text-xs leading-none uppercase mx-2 p-1',
    {
      'bg-red text-white': color === 'red',
      'bg-green text-white': color === 'green',
      'bg-grey-dark text-white': !color,
    }
  )

  return <span className={klassNames}>{children}</span>
}
