import React, { createContext, useReducer, useEffect } from 'react'
import { createClient, createCartIdentifier } from '@moltin/request'

let CartContext

const { Provider, Consumer } = (CartContext = createContext())

const initialState = {
  count: 0,
  items: [],
  cartItems: [],
  promotionItems: [],
  taxItems: [],
  meta: null
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_CART':
      const { data: items, meta } = action.payload

      const cartItems = items.filter(({ type }) => type === 'cart_item')
      const promotionItems = items.filter(
        ({ type }) => type === 'promotion_item'
      )
      const taxItems = items.filter(({ type }) => type === 'tax_item')
      const count = cartItems.reduce(
        (sum, { type, quantity }) => type === 'cart_item' && sum + quantity,
        0
      )

      const subTotal = meta ? meta.display_price.without_tax.formatted : 0

      return {
        ...state,
        items,
        cartItems,
        promotionItems,
        taxItems,
        count,
        meta,
        subTotal
      }

    default:
      throw new Error()
  }
}

function CartProvider({ clientId, cartId = createCartIdentifier(), children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const isEmpty = state.count === 0

  const moltin = new createClient({
    client_id: clientId,
    application: 'react-cartkit'
  })

  useEffect(() => {
    getCart(cartId)
  }, [cartId])

  async function getCart(id) {
    const payload = await moltin.get(`carts/${id}/items`)

    dispatch({ type: 'SET_CART', payload })
  }

  async function addToCart(id, quantity) {
    const payload = await moltin.post(`carts/${cartId}/items`, {
      type: 'cart_item',
      id,
      quantity
    })

    dispatch({ type: 'SET_CART', payload })
  }

  async function updateQuantity(id, quantity) {
    const payload = await moltin.put(`carts/${cartId}/items/${id}`, {
      type: 'cart_item',
      id,
      quantity
    })

    dispatch({ type: 'SET_CART', payload })
  }

  async function removeFromCart(id) {
    const payload = await moltin.delete(`carts/${cartId}/items/${id}`)

    dispatch({ type: 'SET_CART', payload })
  }

  async function addPromotion(code) {
    const payload = await moltin.post(`carts/${cartId}/items`, {
      type: 'promotion_item',
      code
    })

    dispatch({ type: 'SET_CART', payload })
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

    return order
  }

  async function pay() {
    return true
  }

  return (
    <Provider
      value={{
        ...state,
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
