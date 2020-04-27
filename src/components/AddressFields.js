import React, { useState } from 'react'

import Input from './Input'
import PlacesSuggest from './PlacesSuggest'

function AddressFields({ type, form, showAddressForm }) {
  const [isEditing, setIsEditing] = useState(false)

  const touchForm = () => setIsEditing(true)

  const onPlacesChange = ({
    suggestion: { name, city, county, countryCode, postcode }
  }) => {
    form.change(`${type}.line_1`, name)
    form.change(`${type}.city`, city)
    form.change(`${type}.county`, county)
    form.change(`${type}.country`, countryCode.toUpperCase())
    form.change(`${type}.postcode`, postcode)

    touchForm()
  }

  const onPlacesClear = () => {
    form.change(`${type}.line_1`, '')
    form.change(`${type}.city`, '')
    form.change(`${type}.county`, '')
    form.change(`${type}.country`, '')
    form.change(`${type}.postcode`, '')
  }

  if (!isEditing && !showAddressForm) {
    return (
      <React.Fragment>
        <PlacesSuggest
          label={type}
          onChange={onPlacesChange}
          onClear={onPlacesClear}
        />
        <button
          onClick={touchForm}
          className="mt-3 text-grey text-sm appearance-none bg-transparent underline"
        >
          Enter address manually
        </button>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <div className="md:flex -mx-2">
        <div className="my-2 w-full px-2">
          <Input
            name={`${type}.first_name`}
            label="First name"
            required
            autoFocus
          />
        </div>

        <div className="my-2 w-full px-2">
          <Input name={`${type}.last_name`} label="Last name" required />
        </div>
      </div>

      <div className="md:flex -mx-2">
        <div className="my-2 w-full px-2">
          <Input name={`${type}.line_1`} label="Address line 1" required />
        </div>
      </div>

      <div className="md:flex -mx-2">
        <div className="my-2 w-full px-2">
          <Input name={`${type}.line_2`} label="Address line 2" />
        </div>
      </div>

      <div className="md:flex -mx-2">
        <div className="my-2 w-full px-2">
          <Input name={`${type}.city`} label="City" required />
        </div>
      </div>

      <div className="md:flex -mx-2">
        <div className="my-2 w-full px-2">
          <Input
            name={`${type}.county`}
            label="State / County / Region"
            required
          />
        </div>

        <div className="my-2 w-full px-2">
          <Input name={`${type}.postcode`} label="ZIP / Postcode" required />
        </div>
      </div>

      <div className="md:flex -mx-2">
        <div className="my-2 w-full px-2">
          <Input name={`${type}.country`} label="Country" required />
        </div>
      </div>
    </React.Fragment>
  )
}

export default AddressFields
