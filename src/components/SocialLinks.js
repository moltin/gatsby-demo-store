import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Twitter, Facebook, Linkedin } from 'react-social-sharing'

function SocialLinks({ product }) {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          url
        }
      }
    }
  `)

  const pageUrl = `${site.siteMetadata.url}/products/${product.slug}`
  const shareMessage = `${product.name} ${pageUrl} via @moltin #Gatsby #JAMstack #HeadlessCommerce`

  return (
    <div className="-mx-2 my-6">
      <Twitter small link={pageUrl} message={shareMessage} />
      <Facebook small link={pageUrl} message={shareMessage} />
      <Linkedin small link={pageUrl} message={shareMessage} />
    </div>
  )
}

export default SocialLinks
