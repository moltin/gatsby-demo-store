import React from 'react'
import Img from 'gatsby-image'

export default function Photo({ src, cartImg, ...props }) {
  function renderImage() {
    if (!src) return <span>No photo</span>

    return cartImg ? (
      <img className="block m-auto object-cover" src={src} {...props} />
    ) : (
      <Img
        className="block m-auto object-cover"
        fixed={src.childImageSharp.fixed}
        {...props}
      />
    )
  }

  return (
    <div className="product-image cursor-pointer bg-grey-light flex items-center justify-center w-full overflow-hidden relative">
      {renderImage()}
    </div>
  )
}
