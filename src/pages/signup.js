import React, { useState, useContext } from 'react'
import { navigate } from 'gatsby'
import { Form } from 'react-final-form'

import { CustomerContext } from '../context'
import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'
import Input from '../components/Input'

const signupPage = () => {
  const { register } = useContext(CustomerContext)
  const [registrationError, setregistrationError] = useState(null)

  async function onSubmit({ name, email, password }) {
    try {
      await register(name, email, password)

      navigate('/')
    } catch ({ errors: [{ detail = 'Incorrect details. Try again.' }] }) {
      setregistrationError(detail)
    }
  }

  return (
    <>
      <SEO title="Your account" />
      <PageTitle>Create account</PageTitle>

      <div className="max-w-sm mx-auto">
        {registrationError && (
          <div className="bg-red text-white p-3 text-center">{registrationError}</div>
        )}

        <Form onSubmit={onSubmit}>
          {({ handleSubmit, submitting, invalid }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="my-2">
                  <Input
                    type="name"
                    name="name"
                    label="Name"
                    required
                    autoFocus
                  />
                </div>
                <div className="my-2">
                  <Input
                    type="email"
                    name="email"
                    label="Email"
                    required
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
                  Sign up
                </button>
              </form>
            )
          }}
        </Form>
      </div>
    </>
  )
}

export default signupPage
