import React, { useState, useContext } from 'react'
import { Link, navigate } from 'gatsby'
import { Form } from 'react-final-form'

import { CustomerContext } from '../context'
import { CartContext } from '../context'
import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'
import Input from '../components/Input'

const LoginPage = () => {
  const { login } = useContext(CustomerContext)
  const { setUserCartId } = useContext(CartContext)
  const [loginError, setLoginError] = useState(null)

  async function onSubmit({ email, password }) {
    try {
      const customerId = await login(email, password)
      await setUserCartId(customerId)
      navigate('/')
    } catch ({ errors: [{ detail = 'Incorrect details. Try again.' }] }) {
      setLoginError(detail)
    }
  }

  return (
    <>
      <SEO title="Your account" />
      <PageTitle>Your account</PageTitle>

      <div className="max-w-sm mx-auto">
        {loginError && (
          <div className="bg-red text-white p-3 text-center">{loginError}</div>
        )}

        <Form onSubmit={onSubmit}>
          {({ handleSubmit, submitting, invalid }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="my-2">
                  <Input
                    type="email"
                    name="email"
                    label="Email"
                    required
                    autoFocus
                  />
                </div>

                <div className="my-2">
                  <Input
                    type="password"
                    name="password"
                    label="Password"
                    required
                  />
                </div>

                <button
                  disabled={submitting || invalid}
                  type="submit"
                  className="block w-full appearance-none bg-black border border-black text-white hover:text-white px-4 py-3 leading-tight rounded-none focus:outline-none mt-4 no-underline"
                >
                  Login
                </button>
                <div className="my-4">
                  Don't have an account?
                  <Link to="/signup" className="no-underline">
                    <button className="block w-full appearance-none bg-black border border-black text-white hover:text-white px-4 py-3 leading-tight rounded-none focus:outline-none no-underline">
                      <span className="no-underlinerelative inline-flex items-center">
                        Sign up
                      </span>
                    </button>
                  </Link>
                </div>
              </form>
            )
          }}
        </Form>
      </div>
    </>
  )
}

export default LoginPage
