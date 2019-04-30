import React from 'react'

import { ShopkitProvider } from './src/shopkit'
import Layout from './src/components/Layout'

export const wrapRootElement = ({ element }) => {
  return (
    <ShopkitProvider clientId={process.env.GATSBY_MOLTIN_CLIENT_ID}>
      {element}
    </ShopkitProvider>
  )
}

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
