import React from 'react'
import { CartProvider } from './src/components/CartContext'

export const wrapRootElement = ({ element }) => {
  return <CartProvider>{element}</CartProvider>
}
