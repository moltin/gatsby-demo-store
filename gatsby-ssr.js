import React from 'react'
import { Elements } from 'react-stripe-elements'

import { MoltinProvider } from './src/context'
import LayoutProvider from './src/components/LayoutProvider'
import StripeProvider from './src/components/StripeProvider'
import Layout from './src/components/Layout'

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
