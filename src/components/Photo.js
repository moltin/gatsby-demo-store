import React from 'react'
import Img from 'gatsby-image'

export default function Photo({ src, cartImg, ...props }) {
  function renderImage() {
    if (!src) return <span>No photo</span>

    return cartImg ? (
      <img
        className="block m-auto object-cover w-full"
        src={src}
        alt=""
        {...props}
      />
    ) : (
      <Img
        className="block m-auto object-cover w-full"
        fluid={src.childImageSharp.fluid}
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
