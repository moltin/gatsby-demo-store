import React from 'react'
import { Elements } from 'react-stripe-elements'

import { MoltinProvider } from './src/context'
import LayoutProvider from './src/components/LayoutProvider'
import StripeProvider from './src/components/StripeProvider'
import Layout from './src/components/Layout'

export const onRenderBody = ({ setPostBodyComponents }) => {
  return setPostBodyComponents([
    <script
      src="https://unpkg.com/@bounteous/shopkit@0.0.1/dist/index.js"
      id="shopkit-js"
      key="moltin-shopkit"
      data-moltin-client-id={process.env.GATSBY_MOLTIN_CLIENT_ID}
      data-moltin-stripe-publishable-key={process.env.GATSBY_STRIPE_PUBLISHABLE_KEY}
    />
  ]);
}

export const wrapRootElement = ({ element }) => {
  return (
    <StripeProvider>
      <MoltinProvider clientId={process.env.GATSBY_MOLTIN_CLIENT_ID}>
        <LayoutProvider>
          <Elements>{element}</Elements>
        </LayoutProvider>
      </MoltinProvider>
    </StripeProvider>
  )
}

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
