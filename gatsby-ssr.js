import React from 'react'

import { MoltinProvider } from './src/context'
import Layout from './src/components/Layout'

export const wrapRootElement = ({ element }) => {
  return (
    <MoltinProvider clientId={process.env.GATSBY_MOLTIN_CLIENT_ID}>
      {element}
    </MoltinProvider>
  )
}

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
