import React from 'react'

import Input from './Input'

export default function AddressFields({ type }) {
  return (
    <React.Fragment>
      <div className="md:flex -mx-2">
        <div className="my-2 w-full px-2">
          <Input name={`${type}.first_name`} label="First name" required />
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
