import { useContext, useEffect, useReducer, useState } from 'react'

import { MoltinContext } from '../context'

function inventoryReducer(inventory, { type, data }) {
  switch (type) {
    case 'IN_STOCK':
      return {
        inStock: true,
        ...data
      }
    case 'OUT_OF_STOCK':
      return {
        inStock: false,
        ...data
      }
    default:
      return inventory
  }
}

function useMoltinInventory({ id, manage_stock, name }) {
  const { moltin } = useContext(MoltinContext)
  const [inventory, inventoryDispatch] = useReducer(inventoryReducer, {
    inStock: null,
    available: 0
  })
  const [inventoryLoading, setInventoryLoading] = useState(true)
  const [inventoryError, setInventoryError] = useState(false)

  async function getProductInventory() {
    try {
      const {
        data: { available }
      } = await moltin.get(`inventories/${id}`)

      inventoryDispatch({
        type: available === 0 ? 'OUT_OF_STOCK' : 'IN_STOCK',
        data: { available }
      })
      setInventoryLoading(false)
    } catch ({ errors: [error] }) {
      console.error(error)
      setInventoryError(
        `There was a problem retrieving the inventory details for ${name}`
      )
    }
  }

  useEffect(() => {
    if (!manage_stock) {
      inventoryDispatch({ type: 'IN_STOCK' })

      return setInventoryLoading(false)
    }

    getProductInventory()
  }, [])

  return [inventory, inventoryLoading, inventoryError]
}

export default useMoltinInventory
