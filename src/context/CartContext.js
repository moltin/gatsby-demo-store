import React, { useContext, createContext, useReducer, useEffect } from 'react'
import { createCartIdentifier } from '@moltin/request'
import { toast } from 'react-toastify'

import { MoltinContext } from '.'

import useLocalStorage from './useLocalStorage'

export const SET_CART = 'SET_CART'
export const RESET_CART = 'RESET_CART'

export const initialState = {
  count: 0,
  items: [],
  cartItems: [],
  promotionItems: [],
  taxItems: [],
  meta: null
}

export default function reducer(state, action) {
  switch (action.type) {
    case SET_CART:
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

    case RESET_CART:
      return initialState

    default:
      return state
  }
}

let CartContext

const { Provider, Consumer } = (CartContext = createContext())

function CartProvider({
  clientId,
  cartId: initialCartId = createCartIdentifier(),
  children,
  ...props
}) {
  const { moltin } = useContext(MoltinContext)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [cartId, setCartId] = useLocalStorage('mcart', initialCartId)
  const isEmpty = state.count === 0

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

    toast.success(
      `Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to cart`
    )
  }

  async function updateQuantity(id, quantity) {
    const payload = await moltin.put(`carts/${cartId}/items/${id}`, {
      type: 'cart_item',
      id,
      quantity
    })

    dispatch({ type: SET_CART, payload })

    toast.success(`Quantity updated to ${quantity}`)
  }

  async function removeFromCart(id) {
    const payload = await moltin.delete(`carts/${cartId}/items/${id}`)

    dispatch({ type: SET_CART, payload })

    toast.success('Item removed from cart')
  }

  async function addPromotion(code) {
    const payload = await moltin.post(`carts/${cartId}/items`, {
      type: 'promotion_item',
      code
    })

    dispatch({ type: SET_CART, payload })

    toast.success('Promotion applied')
  }

  async function deleteCart(id) {
    await moltin.delete(`carts/${id || cartId}`)

    dispatch({ type: RESET_CART })
  }

  async function setUserCartId(customerId) {
    await setCartId(customerId)
    await getCart(customerId)
  }

  async function setDefaultCartId() {
    await setCartId(initialCartId)
  }

  return (
    <Provider
      value={{
        ...state,
        ...props,
        cartId,
        isEmpty,
        addToCart,
        updateQuantity,
        removeFromCart,
        addPromotion,
        removePromotion: removeFromCart,
        deleteCart,
        setUserCartId,
        setDefaultCartId
      }}
    >
      {children}
    </Provider>
  )
}

export { CartProvider, Consumer as CartConsumer, CartContext }
