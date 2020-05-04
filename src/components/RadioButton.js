import React from 'react'

export default function RadioButton({
  id,
  label,
  value,
  onChange,
  checked,
  name
}) {
  return (
    <div className="mt-4 clearfix">
      <input
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        type="radio"
        checked={checked}
        className="hidden"
      />
      <label
        htmlFor={id}
        className={`appearance-none border border-black px-4 py-3 focus:outline-none mr-2 no-underline ${checked &&
          'bg-black text-white'}`}
      >
        {label}
      </label>
    </div>
  )
}
