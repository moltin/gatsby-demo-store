import React, { createContext } from 'react'
import { MoltinClient } from '@moltin/request'

import { CartProvider, CartContext } from './CartContext'
import { CustomerProvider, CustomerContext } from './CustomerContext'
import { CheckoutProvider, CheckoutContext } from './CheckoutContext'

class MoltinLocalStorageAdapter {
  set(key, value) {
    return window.localStorage.setItem(key, value)
  }

  get(key) {
    return window.localStorage.getItem(key)
  }

  delete(key) {
    return window.localStorage.removeItem(key)
  }
}

let MoltinContext

const { Provider, Consumer } = (MoltinContext = createContext())

function MoltinProvider({
  clientId,
  cartId,
  customerToken,
  children,
  ...props
}) {
  const moltin = new MoltinClient({
    client_id: clientId,
    application: 'gatsby-demo-store',
    storage: new MoltinLocalStorageAdapter()
  })

  return (
    <Provider
      value={{
        ...props,
        moltin
      }}
    >
      <CustomerProvider customerToken={customerToken}>
        <CartProvider cartId={cartId}>
          <CheckoutProvider cartId={cartId}>{children}</CheckoutProvider>
        </CartProvider>
      </CustomerProvider>
    </Provider>
  )
}

export {
  MoltinProvider,
  Consumer as MoltinConsumer,
  MoltinContext,
  CartContext,
  CustomerContext,
  CheckoutContext
}
