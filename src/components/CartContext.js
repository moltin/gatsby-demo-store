import React, { createContext, useState, useEffect } from 'react'

let CartContext

const { Provider, Consumer } = (CartContext = createContext())

function CartProvider(props) {
  const [count, setCount] = useState(0)
  // const [items, setItems] = useState([])
  // const [meta, setMeta] = useState(null)

  useEffect(() => {
    getCart()
  }, [])

  async function getCart() {
    setCount(0)
    // const { data, meta } = await moltin.Cart().Items()

    // const count = data.length

    // setCount(count)
    // setItems(data)
    // setMeta(meta)
  }

  async function addToCart(productId, quantity) {
    setCount(count + quantity)
    // const { data, meta } = await moltin.Cart().AddProduct(productId, quantity)

    // const count = data.length

    // setCount(count)
    // setItems(data)
    // setMeta(meta)
  }

  async function removeFromCart(itemId) {
    // const { data, meta } = await moltin.Cart().RemoveItem(itemId)
    // const count = data.length
    // setCount(count)
    // setItems(data)
    // setMeta(meta)
  }

  return (
    <Provider
      value={{
        count,
        setCount,
        // items,
        // meta,
        addToCart,
        removeFromCart
      }}
    >
      {props.children}
    </Provider>
  )
}

export { CartProvider, Consumer as CartConsumer, CartContext }
