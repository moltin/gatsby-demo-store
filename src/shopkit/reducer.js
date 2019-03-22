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
      throw new Error()
  }
}
