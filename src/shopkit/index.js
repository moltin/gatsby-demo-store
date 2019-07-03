import React, { createContext } from 'react'
import { MoltinClient } from '@moltin/request'

import { CartProvider, Cartkit } from './Cartkit'
import { CustomerProvider, Customerkit } from './Customerkit'
import { CheckoutProvider, Checkoutkit } from './Checkoutkit'

class MoltinNodeStorageAdapter {
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

let ShopkitContext

const { Provider, Consumer } = (ShopkitContext = createContext())

function ShopkitProvider({
  clientId,
  cartId,
  customerToken,
  children,
  ...props
}) {
  const moltin = new MoltinClient({
    client_id: clientId,
    application: 'react-cartkit',
    storage: new MoltinNodeStorageAdapter()
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
  ShopkitProvider,
  Consumer as ShopkitConsumer,
  ShopkitContext as Shopkit,
  Cartkit,
  Customerkit,
  Checkoutkit
}
