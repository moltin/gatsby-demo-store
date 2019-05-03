import React, { useContext, createContext } from 'react'

import { Shopkit } from './'

let CheckoutContext

const { Provider, Consumer } = (CheckoutContext = createContext())

function CheckoutProvider({ cartId: initialCartId, children, ...props }) {
  const { moltin } = useContext(Shopkit)

  async function checkout(
    cartId = initialCartId,
    { customer, shipping_address, billing_address = shipping_address }
  ) {
    const createCustomer = customer && customer.password
    let customerId

    if (createCustomer) {
      const { data: newCustomer } = await moltin.post(`customers`, {
        type: 'customer',
        ...customer
      })

      customerId = newCustomer.id
    }

    const { data: order } = await moltin.post(`carts/${cartId}/checkout`, {
      ...(createCustomer ? { customer: { id: customerId } } : { customer }),
      shipping_address,
      billing_address
    })

    return order
  }

  async function pay({ orderId, token }) {
    try {
      const { payment } = await moltin.post(`orders/${orderId}/payments`, {
        gateway: 'stripe',
        method: 'purchase',
        payment: token
      })

      return payment
    } catch (err) {
      throw new Error(err.message || 'Payment failed')
    }
  }

  return (
    <Provider
      value={{
        ...props,
        checkout,
        pay
      }}
    >
      {children}
    </Provider>
  )
}

export {
  CheckoutProvider,
  Consumer as CheckoutConsumer,
  CheckoutContext as Checkoutkit
}
