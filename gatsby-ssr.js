import React from 'react'
import { Elements } from 'react-stripe-elements'

import { ShopkitProvider } from './src/shopkit'
import StripeProvider from './src/components/StripeProvider'
import Layout from './src/components/Layout'

export const wrapRootElement = ({ element }) => {
  return (
    <StripeProvider>
      <ShopkitProvider clientId={process.env.GATSBY_MOLTIN_CLIENT_ID}>
        <Elements>{element}</Elements>
      </ShopkitProvider>
    </StripeProvider>
  )
}

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
