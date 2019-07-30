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

    // await moltin.delete(`carts/${cartId}`)

    // dispatch({ type: RESET_CART })

    return order
  }

  async function pay({ orderId }) {
    return true
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

export { CheckoutProvider, Consumer as CheckoutConsumer, CheckoutContext }
