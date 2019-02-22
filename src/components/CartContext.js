import React, { createContext, useState, useEffect } from 'react'
import { createClient, createCartIdentifier } from '@moltin/request'

let CartContext

const { Provider, Consumer } = (CartContext = createContext())

function CartProvider({ clientId, cartId = createCartIdentifier(), children }) {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([])
  const [meta, setMeta] = useState(null)
  const isEmpty = count === 0

  const moltin = new createClient({
    client_id: clientId,
    application: 'react-cartkit'
  })

  useEffect(() => {
    getCart(cartId)
  }, [cartId])

  function updateCount(items) {
    const newCount = items.reduce((sum, { quantity }) => sum + quantity, 0)

    setCount(newCount)
  }

  async function getCart(id) {
    const { data, meta } = await moltin.get(`carts/${id}/items`)

    updateCount(data)
    setItems(data)
    setMeta(meta)
  }

  async function addToCart(id, quantity) {
    const { data, meta } = await moltin.post(`carts/${cartId}/items`, {
      type: 'cart_item',
      id,
      quantity
    })

    updateCount(data)
    setItems(data)
    setMeta(meta)
  }

  async function updateQuantity(id, quantity) {
    const { data, meta } = await moltin.put(`carts/${cartId}/items/${id}`, {
      type: 'cart_item',
      id,
      quantity
    })

    updateCount(data)
    setItems(data)
    setMeta(meta)
  }

  async function removeFromCart(id) {
    const { data, meta } = await moltin.delete(`carts/${cartId}/items/${id}`)

    updateCount(data)
    setItems(data)
    setMeta(meta)
  }

  return (
    <Provider
      value={{
        count,
        isEmpty,
        items,
        meta,
        addToCart,
        updateQuantity,
        removeFromCart
      }}
    >
      {children}
    </Provider>
  )
}

export { CartProvider, Consumer as CartConsumer, CartContext }
