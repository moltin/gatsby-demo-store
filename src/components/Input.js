import React from 'react'
import classNames from 'classnames'
import { Field } from 'react-final-form'

export default function Input({
  label,
  name,
  autoFocus,
  type,
  className,
  placeholder,
  ...props
}) {
  return (
    <Field name={name} {...props}>
      {({ input, meta }) => {
        const error = meta.error && meta.touched

        const labelClass = classNames('mb-2 inline-block', {
          'text-red': error
        })

        const inputClass = classNames(
          'block appearance-none w-full bg-white border border-grey-dark hover:border-grey px-4 py-3 leading-tight rounded-none focus:outline-none',
          className,
          {
            'border-red hover:border-red': error
          }
        )

        return (
          <div>
            <label htmlFor={name} className={labelClass}>
              {label}
            </label>
            <input
              type={type}
              id={name}
              autoFocus={autoFocus}
              className={inputClass}
              placeholder={placeholder || label}
              {...input}
            />

            {!props.hideError && error && (
              <span className="text-red text-sm">{meta.error}</span>
            )}
          </div>
        )
      }}
    </Field>
  )
}
