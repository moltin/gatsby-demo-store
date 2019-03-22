import React, { createContext, useReducer, useEffect } from 'react'
import { createClient, createCartIdentifier } from '@moltin/request'

import reducer, { initialState, SET_CART, RESET_CART } from './reducer'
import useLocalStorage from './hooks/useLocalStorage'

let CartContext

const { Provider, Consumer } = (CartContext = createContext())

function CartProvider({
  clientId,
  cartId: initialCartId = createCartIdentifier(),
  children,
  ...props
}) {
  const [state, dispatch] = useReducer(reducer, initialState)
  let [cartId, setCartId] = useLocalStorage('mcart', initialCartId)
  const isEmpty = state.count === 0

  const moltin = new createClient({
    client_id: clientId,
    application: 'react-cartkit'
  })

  useEffect(() => {
    getCart(cartId)
    setCartId(cartId)
  }, [cartId])

  async function getCart(id) {
    const payload = await moltin.get(`carts/${id}/items`)

    dispatch({ type: SET_CART, payload })
  }

  async function addToCart(id, quantity) {
    const payload = await moltin.post(`carts/${cartId}/items`, {
      type: 'cart_item',
      id,
      quantity
    })

    dispatch({ type: SET_CART, payload })
  }

  async function updateQuantity(id, quantity) {
    const payload = await moltin.put(`carts/${cartId}/items/${id}`, {
      type: 'cart_item',
      id,
      quantity
    })

    dispatch({ type: SET_CART, payload })
  }

  async function removeFromCart(id) {
    const payload = await moltin.delete(`carts/${cartId}/items/${id}`)

    dispatch({ type: SET_CART, payload })
  }

  async function addPromotion(code) {
    const payload = await moltin.post(`carts/${cartId}/items`, {
      type: 'promotion_item',
      code
    })

    dispatch({ type: SET_CART, payload })
  }

  async function checkout({
    customer,
    shipping_address,
    billing_address = shipping_address
  }) {
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

    await moltin.delete(`carts/${cartId}`)

    dispatch({ type: RESET_CART })

    return order
  }

  async function pay() {
    return true
  }

  return (
    <Provider
      value={{
        ...state,
        ...props,
        isEmpty,
        addToCart,
        updateQuantity,
        removeFromCart,
        addPromotion,
        removePromotion: removeFromCart,
        checkout,
        pay
      }}
    >
      {children}
    </Provider>
  )
}

export { CartProvider, Consumer as CartConsumer, CartContext }
