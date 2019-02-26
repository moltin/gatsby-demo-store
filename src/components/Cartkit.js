import React, { createContext, useState, useEffect } from 'react'
import { createClient, createCartIdentifier } from '@moltin/request'

let CartContext

const { Provider, Consumer } = (CartContext = createContext())

function CartProvider({ clientId, cartId = createCartIdentifier(), children }) {
  const [count, setCount] = useState(0)
  const [allItems, setAllItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [promotionItems, setPromotionItems] = useState([])
  const [taxItems, setTaxItems] = useState([])
  const [meta, setMeta] = useState(null)
  const isEmpty = count === 0

  const moltin = new createClient({
    client_id: clientId,
    application: 'react-cartkit'
  })

  useEffect(() => {
    getCart(cartId)
  }, [cartId])

  function updateItems(items) {
    const cartItems = items.filter(({ type }) => type === 'cart_item')
    const promotionItems = items.filter(({ type }) => type === 'promotion_item')
    const taxItems = items.filter(({ type }) => type === 'tax_item')

    const newCount = cartItems.reduce(
      (sum, { type, quantity }) => type === 'cart_item' && sum + quantity,
      0
    )

    setAllItems(items)
    setCartItems(cartItems)
    setPromotionItems(promotionItems)
    setTaxItems(taxItems)
    setCount(newCount)
  }

  async function getCart(id) {
    const { data, meta } = await moltin.get(`carts/${id}/items`)

    updateItems(data)
    setMeta(meta)
  }

  async function addToCart(id, quantity) {
    const { data, meta } = await moltin.post(`carts/${cartId}/items`, {
      type: 'cart_item',
      id,
      quantity
    })

    updateItems(data)
    setMeta(meta)
  }

  async function updateQuantity(id, quantity) {
    const { data, meta } = await moltin.put(`carts/${cartId}/items/${id}`, {
      type: 'cart_item',
      id,
      quantity
    })

    updateItems(data)
    setMeta(meta)
  }

  async function removeFromCart(id) {
    const { data, meta } = await moltin.delete(`carts/${cartId}/items/${id}`)

    updateItems(data)
    setMeta(meta)
  }

  async function addPromotion(code) {
    const { data, meta } = await moltin.post(`carts/${cartId}/items`, {
      type: 'promotion_item',
      code
    })

    updateItems(data)
    setMeta(meta)
  }

  async function checkout(customer, billing, shipping = billing) {
    return true
  }

  async function pay() {
    return true
  }

  return (
    <Provider
      value={{
        count,
        isEmpty,
        cartItems,
        promotionItems,
        taxItems,
        allItems,
        meta,
        addToCart,
        updateQuantity,
        removeFromCart,
        addPromotion,
        checkout,
        pay
      }}
    >
      {children}
    </Provider>
  )
}

export { CartProvider, Consumer as CartConsumer, CartContext }
