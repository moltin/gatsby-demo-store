import React from 'react'

import { CartProvider } from './src/components/CartContext'
import Layout from './src/components/Layout'

export const wrapRootElement = ({ element }) => {
  return <CartProvider>{element}</CartProvider>
}

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
