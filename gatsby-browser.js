import React from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'

import { ShopkitProvider } from './src/shopkit'
import Layout from './src/components/Layout'

export const wrapRootElement = ({ element }) => {
  return (
    <StripeProvider apiKey={process.env.GATSBY_STRIPE_PUBLISHABLE_KEY}>
      <ShopkitProvider clientId={process.env.GATSBY_MOLTIN_CLIENT_ID}>
        <Elements>{element}</Elements>
      </ShopkitProvider>
    </StripeProvider>
  )
}

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
