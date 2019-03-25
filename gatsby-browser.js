import React from 'react'

import { ShopkitProvider } from './src/shopkit'
import Layout from './src/components/Layout'

export const wrapRootElement = ({ element }) => {
  return (
    <ShopkitProvider clientId="EdP3Gi1agyUF3yFS7Ngm8iyodLgbSR3wY4ceoJl0d2">
      {element}
    </ShopkitProvider>
  )
}

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
