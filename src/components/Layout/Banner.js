import React from 'react'

export default function Banner() {
  return (
    <div className="bg-black my-6 p-6 text-center">
      <p className="text-white">
        Free shipping when you spend over $120{' '}
        <span className="text-grey-lighter">
          along with free next day delivery when you spend over $200
        </span>
      </p>
    </div>
  )
}
