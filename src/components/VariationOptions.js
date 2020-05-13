import React, { useState } from 'react'
import RadioButton from './RadioButton'

export default function VariationOptions({
  variation,
  defaultOption,
  onChange
}) {
  const [optionChecked, setOptionChecked] = useState(defaultOption)
  const handleChange = option => {
    setOptionChecked(option.id)
    onChange(option, variation)
  }
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
            onChange={() => handleChange(option)}
            value={option.id}
            checked={optionChecked === option.id}
          />
        ))}
      </div>
    </div>
  )
}
