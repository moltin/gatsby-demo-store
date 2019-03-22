import React from 'react'

import { CartProvider } from './src/shopkit'
import Layout from './src/components/Layout'

export const wrapRootElement = ({ element }) => {
  return (
    <CartProvider clientId="EdP3Gi1agyUF3yFS7Ngm8iyodLgbSR3wY4ceoJl0d2">
      {element}
    </CartProvider>
  )
}

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
