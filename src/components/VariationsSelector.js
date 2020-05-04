import React, { useState } from 'react'
import VariationOptions from './VariationOptions'

export default function VariationsSelector({ product, onChange }) {
  const { variations, variation_matrix } = product.meta
  if (!variations) return <div />

  const initialOptions = variations.reduce(
    (acum, variation) => ({ ...acum, [variation.id]: variation.options[0].id }),
    {}
  )
  const variationMatrix = JSON.parse(variation_matrix)
  processOptions(initialOptions)
  const [selectedOptions, setSelectedOptions] = useState(initialOptions)

  function getChildID(options, prodMatrix) {
    if (options.length !== 0 && typeof prodMatrix === 'string') {
      return prodMatrix
    }
    for (const x in options) {
      if (options.hasOwnProperty(x) && prodMatrix[options[x]]) {
        const subMatrix = prodMatrix[options[x]]
        return getChildID(options, subMatrix)
      }
    }
    return null
  }

  function processOptions(updatedOptions) {
    const options = Object.values(updatedOptions)
    const childID = getChildID(options, variationMatrix)
    onChange(childID)
  }

  function handleChange(option, variation) {
    const updatedOptions = { ...selectedOptions, [variation.id]: option.id }
    setSelectedOptions(updatedOptions)
    processOptions(updatedOptions)
  }

  return (
    <div className="mb-6">
      {variations.map(variation => (
        <VariationOptions
          variation={variation}
          key={variation.id}
          defaultOption={selectedOptions[variation.id]}
          onChange={handleChange}
        />
      ))}
    </div>
  )
}
