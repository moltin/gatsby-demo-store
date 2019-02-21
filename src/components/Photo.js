import React from 'react'
import Img from 'gatsby-image'

export default function Photo({ src }) {
  return (
    <div className="product-image cursor-pointer bg-grey-light flex items-center justify-center w-full overflow-hidden relative">
      {src ? (
        <Img
          className="block m-auto object-cover"
          fixed={src.childImageSharp.fixed}
        />
      ) : null}
    </div>
  )
}
