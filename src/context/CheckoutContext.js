import React, { useContext, createContext } from 'react'

import { MoltinContext } from '.'

let CheckoutContext

const { Provider, Consumer } = (CheckoutContext = createContext())

function CheckoutProvider({ cartId: initialCartId, children, ...props }) {
  const { moltin } = useContext(MoltinContext)

  async function checkout(
    cartId = initialCartId,
    { customer, shipping_address, billing_address = shipping_address }
  ) {
    const createCustomer = customer && customer.password
    let customerId = customer && customer.id

    if (createCustomer) {
      const { data: newCustomer } = await moltin.post(`customers`, {
        type: 'customer',
        ...customer
      })

      customerId = newCustomer.id
    }

    const { data: order } = await moltin.post(`carts/${cartId}/checkout`, {
      ...(createCustomer || customerId
        ? { customer: { id: customerId } }
        : { customer }),
      shipping_address,
      billing_address
    })

    return order
  }

  async function pay({ gateway, method, orderId, ...rest }) {
    try {
      const { data } = await moltin.post(`orders/${orderId}/payments`, {
        gateway,
        method,
        ...rest
      })

      return data
    } catch (err) {
      throw new Error(err.message || 'Payment failed')
    }
  }

  async function confirmTransaction({
    gateway,
    orderId,
    payment,
    transactionId
  }) {
    await moltin.post(
      `orders/${orderId}/transactions/${transactionId}/confirm`,
      {
        payment,
        gateway
      }
    )
  }

  return (
    <Provider
      value={{
        ...props,
        checkout,
        pay,
        confirmTransaction
      }}
    >
      {children}
    </Provider>
  )
}

export { CheckoutProvider, Consumer as CheckoutConsumer, CheckoutContext }
