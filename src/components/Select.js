import React from 'react'

export default function Select({ options, defaultValue, ...props }) {
  return (
    <div className="inline-flex relative">
      <select
        className="block bg-transparent appearance-none w-full border border-black hover:border-grey pl-4 pr-10 py-2 leading-tight rounded-none focus:outline-none"
        {...props}
      >
        {options.map(opt => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute pin-y pin-r flex items-center px-4 text-grey-darker">
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 9 14"
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke="#131313"
            strokeWidth="1.5"
            transform="translate(1 1)"
          >
            <polyline points="0 9 3.5 12 7 9" />
            <polyline points="0 3 3.5 0 7 3" />
          </g>
        </svg>
      </div>
    </div>
  )
}
