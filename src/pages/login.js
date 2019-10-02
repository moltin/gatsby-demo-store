import React, { useState, useContext } from 'react'
import { navigate } from 'gatsby'
import { Form } from 'react-final-form'

import { CustomerContext } from '../context'
import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'
import Input from '../components/Input'

const LoginPage = () => {
  const { login } = useContext(CustomerContext)
  const [loginError, setLoginError] = useState(null)

  async function onSubmit({ email, password }) {
    try {
      await login(email, password)

      navigate('myorders')
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
              </form>
            )
          }}
        </Form>
      </div>
    </>
  )
}

export default LoginPage
