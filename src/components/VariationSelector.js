import React, { useState } from 'react'
import RadioButton from './RadioButton'

export default function VariationSelector({ variation, onChange }) {
  const optionId = variation.options[0].id;
  const [optionChecked, setOptionChecked] = useState(optionId)
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
              onChange(option)
            }}
            value={option.id}
            checked={optionChecked === option.id}
          />
        ))}
      </div>
    </div>
  )
}
