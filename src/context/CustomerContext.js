import React, { useContext, createContext, useReducer, useEffect } from 'react'

import { MoltinContext } from '.'
import useLocalStorage from './useLocalStorage'

const SET_CUSTOMER = 'SET_CUSTOMER'
const LOGOUT = 'LOGOUT'

let CustomerContext

const { Provider, Consumer } = (CustomerContext = createContext())

const initialState = {
  user: null,
  loggedIn: false
}

function reducer(action, state) {
  switch (action.type) {
    case SET_CUSTOMER:
      return {
        user: action.payload,
        loggedIn: true
      }

    case LOGOUT:
      return {
        user: null,
        loggedIn: false
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
  useEffect(() => {
    token && setToken(token)
    state.loggedIn && getCustomer(customerId, customerToken)
  }, [token])

  async function getCustomer(id, token) {
    const { data: payload } = await moltin.get(`customers/${id}`, {
      'X-Moltin-Customer-Token': token
    })

    setCustomerId(id)
    setToken(token)
    dispatch({ type: SET_CUSTOMER, payload })
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

  async function getAddresses() {
    return []
  }

  async function addAddress(address) {
    return []
  }

  async function removeAddress(id) {
    return []
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
        removeAddress
      }}
    >
      {children}
    </Provider>
  )
}

export { CustomerProvider, Consumer as CustomerConsumer, CustomerContext }
