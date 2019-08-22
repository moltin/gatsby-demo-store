import React from 'react'
import AlgoliaPlaces from 'algolia-places-react'

const options = {
  appId: 'plEPUZAA2D2L',
  apiKey: '4c9f0832a65f800e31b0d50f44670b1f',
  type: ['city', 'address'],
  useDeviceLocation: false,
  style: false
}

function PlacesSuggest({ label, ...props }) {
  const id = `${label}_suggest`

  return (
    <AlgoliaPlaces
      id={id}
      type="search"
      options={options}
      placeholder="Start typing an address"
      {...props}
    />
  )
}

export default PlacesSuggest
