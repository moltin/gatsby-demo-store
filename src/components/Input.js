import React from 'react'
import classNames from 'classnames'

function Input({ label, name, error, ...props }) {
  const labelClass = classNames('mb-2 inline-block', {
    'text-red': error
  })

  const inputClass = classNames(
    'block appearance-none w-full bg-white border border-grey-dark hover:border-grey px-4 py-3 leading-tight rounded-none focus:outline-none',
    {
      'border-red': error
    }
  )

  return (
    <React.Fragment>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input id={name} name={name} className={inputClass} {...props} />
    </React.Fragment>
  )
}

export default Input
