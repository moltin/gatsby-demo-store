import React, { useState, useContext } from 'react'
import { Form, Field } from 'react-final-form'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { Link } from 'gatsby'

import { CartContext, CheckoutContext } from '../context'
import PageTitle from '../components/PageTitle'
import Input from '../components/Input'
import AddressFields from '../components/AddressFields'
import CartItemList from '../components/CartItemList'
import validation from '../validation/checkout'

const initialValues = {
  billingIsShipping: true,
  createCustomer: false,
  customer: { marketing_opt_in: false }
}

function CheckoutPage({ stripe }) {
  const { cartId, isEmpty, subTotal, deleteCart } = useContext(CartContext)
  const [paid, setPaid] = useState(false)
  const [order, setOrder] = useState(null)
  const { checkout, pay } = useContext(CheckoutContext)
  const [checkoutError, setCheckoutError] = useState(null)

  if (paid)
    return (
      <div className="text-center py-12">
        <svg
          className="text-black w-24 h-24 mx-auto mb-6"
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
        >
          <g fill="none" fillRule="evenodd">
            <circle
              className="stroke-current"
              cx="40"
              cy="40"
              r="39"
              strokeWidth="2"
            />
            <polyline
              className="stroke-current"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              points="24.5 41.5 34.5 51.5 55.5 30.5"
            />
          </g>
        </svg>
        <h3 className="text-center text-3xl text-black">Order completed</h3>
        <p className="text-center text-grey mb-6">Thank for your order!</p>
        {order && order.id && (
          <p className="text-center text-grey mb-6">
            ID: <span className="font-mono text-sm">{order.id}</span>
          </p>
        )}

        <Link
          to="/"
          className="inline-block appearance-none bg-black border border-black text-white hover:text-white px-4 py-3 leading-tight rounded-none focus:outline-none no-underline"
        >
          Continue shopping &rarr;
        </Link>
      </div>
    )
  if (isEmpty && !paid) return <p className="text-center">Your cart is empty</p>

  async function onSubmit(values) {
    try {
      const { shipping_address } = values
      const order = await checkout(cartId, values)

      const token = await stripe.createToken({
        name: `${shipping_address.first_name} ${shipping_address.last_name}`,
        address_line1: shipping_address.line_1,
        address_line2: shipping_address.line_2,
        address_city: shipping_address.city,
        address_state: shipping_address.county,
        address_zip: shipping_address.postcode,
        address_country: shipping_address.country
      })

      await pay({
        gateway: 'stripe',
        method: 'purchase',
        orderId: order.id,
        payment: token.token.id
      })

      await setOrder(order)
      await deleteCart()
      await setPaid(true)
    } catch ({ errors }) {
      setCheckoutError(errors)
    }
  }

  return (
    <React.Fragment>
      <PageTitle title="Checkout" />

      <div className="flex flex-wrap -mx-4">
        <div className="p-4 w-full lg:w-3/5">
          <Form
            onSubmit={onSubmit}
            validate={validation}
            initialValues={initialValues}
          >
            {({ handleSubmit, submitting, invalid, values, form }) => {
              const onStripeChange = e => form.change('stripe', e)

              if (
                !values.createCustomer &&
                values.customer &&
                values.customer.password
              ) {
                delete values.customer.password
              }

              if (values.billingIsShipping) {
                delete values.billing_address
              }

              return (
                <form onSubmit={handleSubmit}>
                  {checkoutError && (
                    <div className="bg-red text-white p-3 text-center">
                      {checkoutError}
                    </div>
                  )}

                  <div>
                    <h2 className="text-black font-medium leading-loose p-0 mb-3 pt-6 pb-3 border-b border-grey-light">
                      Contact information
                    </h2>

                    <div className="md:flex -mx-2">
                      <div className="my-2 w-full px-2">
                        <Input name="customer.name" label="Full name" />
                      </div>

                      <div className="my-2 w-full px-2">
                        <Input
                          type="email"
                          name="customer.email"
                          label="Email"
                        />
                      </div>
                    </div>

                    <div className="my-2 w-full">
                      <label
                        htmlFor="createCustomer"
                        className="p-0 m-0 inline-flex items-center cursor-pointer"
                      >
                        <div className="flex items-center justify-center mr-4 relative">
                          <Field
                            id="createCustomer"
                            name="createCustomer"
                            component="input"
                            type="checkbox"
                            className="appearance-none border outline-none p-2 relative rounded-none bg-black border-grey-dark hover:border-grey cursor-pointer"
                          />
                          {values.createCustomer && (
                            <span className="absolute text-white flex">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 10 7"
                                className="w-3 h-3 fill-current"
                              >
                                <path
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1L3.5 6 1 3.727"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                        <span className="text-black">
                          Save my details for later
                        </span>
                      </label>
                    </div>

                    {values.createCustomer && (
                      <React.Fragment>
                        <div className="my-2 w-full">
                          <label
                            htmlFor="customer.marketing_opt_in"
                            className="p-0 m-0 inline-flex items-center cursor-pointer"
                          >
                            <div className="flex items-center justify-center mr-4 relative">
                              <Field
                                id="customer.marketing_opt_in"
                                name="customer.marketing_opt_in"
                                component="input"
                                type="checkbox"
                                className="appearance-none border outline-none p-2 relative rounded-none bg-black border-grey-dark hover:border-grey cursor-pointer"
                              />
                              {values.customer.marketing_opt_in && (
                                <span className="absolute text-white flex">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 10 7"
                                    className="w-3 h-3 fill-current"
                                  >
                                    <path
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M9 1L3.5 6 1 3.727"
                                    />
                                  </svg>
                                </span>
                              )}
                            </div>
                            <span className="text-black">
                              Send me details on new products, discounts and
                              special offers
                            </span>
                          </label>
                        </div>

                        <div className="my-2 w-full">
                          <Input
                            type="password"
                            name="customer.password"
                            label="Password"
                          />
                        </div>
                      </React.Fragment>
                    )}
                  </div>

                  <div>
                    <h2 className="text-black font-medium leading-loose p-0 mb-3 pt-6 pb-3 border-b border-grey-light">
                      Shipping address
                    </h2>

                    <AddressFields type="shipping_address" />
                  </div>

                  <div>
                    <h2 className="text-black font-medium leading-loose p-0 mb-3 pt-6 pb-3 border-b border-grey-light">
                      Billing address
                    </h2>

                    <div className="my-2 w-full">
                      <label
                        htmlFor="billingIsShipping"
                        className="p-0 m-0 inline-flex items-center cursor-pointer"
                      >
                        <div className="flex items-center justify-center mr-4 relative">
                          <Field
                            id="billingIsShipping"
                            name="billingIsShipping"
                            component="input"
                            type="checkbox"
                            className="appearance-none border outline-none p-2 relative rounded-none bg-black border-grey-dark hover:border-grey cursor-pointer"
                          />
                          {values.billingIsShipping && (
                            <span className="absolute text-white flex">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 10 7"
                                className="w-3 h-3 fill-current"
                              >
                                <path
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1L3.5 6 1 3.727"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                        <span className="text-black">
                          Use shipping address for billing
                        </span>
                      </label>
                    </div>

                    {!values.billingIsShipping && (
                      <AddressFields type="billing_address" />
                    )}
                  </div>

                  <div>
                    <h2 className="text-black font-medium leading-loose p-0 mb-3 pt-6 pb-3 border-b border-grey-light">
                      Payment method
                    </h2>

                    <div className="my-2 w-full">
                      <CardElement
                        onChange={onStripeChange}
                        hidePostalCode={true}
                        id="payment"
                        style={{
                          base: {
                            color: '#131313',
                            fontFamily:
                              'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            fontSize: '16px',
                            '::placeholder': {
                              color: '#B3B3B3'
                            }
                          },
                          invalid: {
                            color: '#E62F17',
                            ':focus': {
                              color: '#E62F17'
                            }
                          }
                        }}
                      />
                      {values.stripe && values.stripe.error && (
                        <span className="text-red text-sm">
                          {values.stripe.error.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="bg-grey-lightest p-4 my-6">
                    <p className="text-sm text-center">
                      By clicking the button below you agree to our terms of
                      sale.
                    </p>

                    <button
                      disabled={submitting || invalid}
                      type="submit"
                      className="block w-full appearance-none bg-black border border-black text-white hover:text-white px-4 py-3 leading-tight rounded-none focus:outline-none mt-4 no-underline"
                    >
                      Confirm and Pay {subTotal}
                    </button>
                  </div>
                </form>
              )
            }}
          </Form>
        </div>

        <div className="p-4 w-full lg:w-2/5">
          <div className="bg-grey-lightest p-6 sticky pin-t">
            <h2 className="text-black font-medium leading-loose p-0 mb-3">
              Shopping Cart
            </h2>
            <CartItemList locked />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default injectStripe(CheckoutPage)
