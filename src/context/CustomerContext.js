import React, { useContext, createContext, useReducer, useEffect } from 'react'

import { MoltinContext } from '.'
import useLocalStorage from './useLocalStorage'

const SET_CUSTOMER = 'SET_CUSTOMER'
const LOGOUT = 'LOGOUT'
const SET_ADDRESSES = 'SET_ADDRESSES'
const SET_ORDERS = 'SET_ORDERS'

let CustomerContext

const { Provider, Consumer } = (CustomerContext = createContext())

const initialState = {
  email: null,
  fullName: '',
  loggedIn: false
}

function reducer(state, action) {
  switch (action.type) {
    case SET_CUSTOMER:
      const email = action.payload.email
      const fullName = action.payload.name
      const customerId = action.payload.name

      return {
        ...state,
        email,
        fullName,
        customerId,
        loggedIn: true
      }

    case LOGOUT:
      return {
        email: null,
        fullName: null,
        loggedIn: false,
        addresses: null
      }

    case SET_ADDRESSES:
      return {
        ...state,
        addresses: action.payload
      }

    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload
      }

    default:
      return state
  }
}

function CustomerProvider({ children, customerToken, ...props }) {
  const { moltin } = useContext(MoltinContext)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [token, setToken] = useLocalStorage('mtoken', customerToken)
  const [customerId, setCustomerId] = useLocalStorage('mcustomer')
  const isLoggedIn = state.loggedIn
  const fullName = state.fullName
  const email = state.email
  const customer = customerId
  const addressesList = state.addresses
  const ordersList = state.orders

  useEffect(() => {
    token && setToken(token)
    customerId && getCustomer(customerId, token)
    customerId && token && getAddresses()
    customerId && getAllOrders()
  }, [token])

  async function getCustomer(id, token) {
    const { data: payload } = await moltin.get(`customers/${id}`, {
      'X-Moltin-Customer-Token': token
    })

    setCustomerId(id)
    setToken(token)
    dispatch({ type: SET_CUSTOMER, payload })
  }

  async function onTokenError(e) {
    if (e.statusCode === 403) {
      await logout()
    }
  }

  async function getAllOrders() {
    const { data: payload } = await moltin.get('/orders?page[limit]=100', {
      'X-Moltin-Customer-Token': token
    })
    dispatch({ type: SET_ORDERS, payload })
  }

  async function register(name, email, password) {
    const response = await moltin.post('customers', {
      type: 'customer',
      name,
      email,
      password
    })

    await login(response.data.email, password)
    return response.data.id
  }

  async function login(email, password) {
    const {
      data: { customer_id, token }
    } = await moltin.post('customers/tokens', {
      type: 'token',
      email,
      password
    })

    await getCustomer(customer_id, token)
    return customer_id
  }

  async function logout() {
    setToken('')
    setCustomerId('')
    await dispatch({ type: LOGOUT })
    await window.location.reload()
  }

  async function updateCustomerInfo(name, email, password) {
    await moltin.put(
      `customers/${customer}`,
      {
        type: 'customer',
        name,
        email,
        password
      },
      {
        'X-Moltin-Customer-Token': token
      }
    )
    await getCustomer(customer, token)
  }

  async function getAddresses() {
    try {
      const { data: payload } = await moltin.get(
        `/customers/${customer}/addresses`,
        {
          'X-Moltin-Customer-Token': token
        }
      )
      dispatch({ type: SET_ADDRESSES, payload })
    } catch (e) {
      await onTokenError(e)
    }
  }

  async function addAddress(
    first_name,
    last_name,
    line_1,
    line_2,
    city,
    postcode,
    county,
    country
  ) {
    await moltin.post(`customers/${customer}/addresses`, {
      type: 'address',
      name: '',
      first_name,
      last_name,
      company_name: '',
      phone_number: '',
      line_1,
      line_2,
      city,
      postcode,
      county,
      country,
      instructions: ''
    })

    await getAddresses()
  }

  async function removeAddress(id) {
    await moltin.delete(
      `customers/${customer}/addresses/${id}`,
      {},
      {
        'X-Moltin-Customer-Token': token
      }
    )

    await getAddresses()
  }

  async function updateAddress(
    id,
    first_name,
    last_name,
    line_1,
    line_2,
    city,
    postcode,
    county,
    country
  ) {
    await moltin.put(
      `customers/${customer}/addresses/${id}`,
      {
        type: 'address',
        id,
        name: '',
        first_name,
        last_name,
        company_name: '',
        phone_number: '',
        line_1,
        line_2,
        city,
        postcode,
        county,
        country,
        instructions: ''
      },
      {
        'X-Moltin-Customer-Token': token
      }
    )

    await getAddresses()
  }

  return (
    <Provider
      value={{
        ...state,
        ...props,
        register,
        login,
        logout,
        getAddresses,
        addAddress,
        removeAddress,
        updateAddress,
        isLoggedIn,
        updateCustomerInfo,
        fullName,
        email,
        customerId,
        addressesList,
        getAllOrders,
        ordersList
      }}
    >
      {children}
    </Provider>
  )
}

export { CustomerProvider, Consumer as CustomerConsumer, CustomerContext }
