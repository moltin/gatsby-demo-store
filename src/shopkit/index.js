import React, { createContext } from 'react'
import { createClient } from '@moltin/request'

import { CartProvider, Cartkit } from './Cartkit'
import { CustomerProvider, Customerkit } from './Customerkit'
import { CheckoutProvider, Checkoutkit } from './Checkoutkit'

let ShopkitContext

const { Provider, Consumer } = (ShopkitContext = createContext())

function ShopkitProvider({
  clientId,
  cartId,
  customerToken,
  children,
  ...props
}) {
  const moltin = new createClient({
    client_id: clientId,
    application: 'react-cartkit'
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
