import React, { useState } from 'react'
import RadioButton from './RadioButton'

export default function VariationSelector({
  variation,
  defaultOption,
  onChange
}) {
  const [optionChecked, setOptionChecked] = useState(defaultOption)
  return (
    <div className="mb-4">
      <div className="font-bold">{variation.name}</div>
      <div className="inline-flex">
        {variation.options.map(option => (
          <RadioButton
            key={option.id}
            id={option.id}
            name={option.id}
            label={option.name}
            onChange={() => {
              setOptionChecked(option.id)
              onChange(option, variation)
            }}
            value={option.id}
            checked={optionChecked === option.id}
          />
        ))}
      </div>
    </div>
  )
}
