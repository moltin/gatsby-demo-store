import React, { createContext, useState, useEffect } from 'react'
import { createClient } from '@moltin/request'

let CartContext

const { Provider, Consumer } = (CartContext = createContext())

function CartProvider({ clientId, cartId = 'abc', children }) {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([])
  const [meta, setMeta] = useState(null)

  const moltin = new createClient({
    client_id: 'EdP3Gi1agyUF3yFS7Ngm8iyodLgbSR3wY4ceoJl0d2',
    application: 'react-shopkit'
  })

  useEffect(() => {
    getCart()
  }, [])

  async function getCart() {
    setCount(0)
    const { data, meta } = await moltin.get(`carts/${cartId}/items`)

    const count = data.length

    setCount(count)
    setItems(data)
    setMeta(meta)
  }

  async function addToCart(id, quantity) {
    const { data, meta } = await moltin.post(`carts/${cartId}/items`, {
      type: 'cart_item',
      id,
      quantity
    })

    const count = data.length

    setCount(count)
    setItems(data)
    setMeta(meta)
  }

  async function removeFromCart(id) {
    const { data, meta } = await moltin.delete(`carts/${cartId}/items/${id}`)
    const count = data.length

    setCount(count)
    setItems(data)
    setMeta(meta)
  }

  return (
    <Provider
      value={{
        count,
        empty: count === 0,
        items,
        meta,
        addToCart,
        removeFromCart
      }}
    >
      {children}
    </Provider>
  )
}

export { CartProvider, Consumer as CartConsumer, CartContext }
