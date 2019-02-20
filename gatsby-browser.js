// import './src/styles/main.css'

import React from 'react'
import { CartProvider } from './src/components/CartContext'

export const wrapPageElement = ({ element, props }) => {
  return <CartProvider {...props}>{element}</CartProvider>
}
