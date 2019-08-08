import React from 'react'
import Img from 'gatsby-image'
import cx from 'classnames'

export default function Photo({ src, cartImg, transparent, ...props }) {
  const imageClass = cx(
    'product-image cursor-pointer flex items-center justify-center w-full overflow-hidden relative',
    {
      'bg-grey-light': !transparent
    }
  )

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

  return <div className={imageClass}>{renderImage()}</div>
}
