import React, { useState, useContext } from 'react'
import { Form, Field } from 'react-final-form'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { Link } from 'gatsby'

import { CartContext, CheckoutContext, CustomerContext } from '../context'
import PageTitle from '../components/PageTitle'
import Input from '../components/Input'
import AddressFields from '../components/AddressFields'
import CartItemList from '../components/CartItemList'
import shippingValidation from '../validation/shipping'
import paymentValidation from '../validation/payment'

const initialValues = {
  billingIsShipping: true,
  createCustomer: false,
  customer: { marketing_opt_in: false }
}

function CheckoutPage({ stripe }) {
  const [currentStep, setCurrentStep] = useState('shipping')
  const { cartId, isEmpty, subTotal, deleteCart } = useContext(CartContext)
  const [paid, setPaid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(null)
  const { checkout, pay, confirmTransaction } = useContext(CheckoutContext)
  const { getAllOrders } = useContext(CustomerContext)
  const [checkoutError, setCheckoutError] = useState(null)
  const [cardElement, setCardElement] = useState(null)
  const [checkedShippingAddress, setCheckedShippingAddress] = useState(null)
  const [checkedBillingAddress, setCheckedBillingAddress] = useState(null)
  const [shippingAddressData, setShippingAddressData] = useState({})
  const [billingAddressData, setBillingAddressData] = useState({})
  let { fullName, email, customerId, addressesList } = useContext(
    CustomerContext
  )

  const shippingStep = currentStep === 'shipping'
  const paymentStep = currentStep === 'payment'

  if (fullName && email) {
    initialValues.customer.name = fullName
    initialValues.customer.email = email
    initialValues.customer.id = customerId
  }

  async function selectShippingAddress(addressId, element) {
    const shippingAddress = {
      line_1: element.line_1,
      city: element.city,
      county: element.county,
      country: element.country,
      postcode: element.postcode,
      first_name: element.first_name,
      last_name: element.last_name
    }
    initialValues.shipping_address = shippingAddress
    await setShippingAddressData(shippingAddress)
    await setCheckedShippingAddress(addressId)
  }

  async function selectBillingAddress(addressId, element) {
    const billingAddress = {
      line_1: element.line_1,
      city: element.city,
      county: element.county,
      country: element.country,
      postcode: element.postcode,
      first_name: element.first_name,
      last_name: element.last_name
    }
    initialValues.shipping_address = billingAddress
    await setBillingAddressData(billingAddress)
    await setCheckedBillingAddress(addressId)
  }

  function validate(values) {
    if (shippingStep) return shippingValidation(values)

    return paymentValidation(values)
  }

  function handleSubmit(values) {
    if (shippingStep) return proceedToPayment(values)

    return onSubmit(values)
  }

  async function proceedToPayment(values) {
    setLoading(true)

    try {
      // const {
      //   shipping_address: { county, postcode }
      // } = values

      setCurrentStep('payment')
      setLoading(false)
    } catch ({ errors: [{ detail = 'Unable to process checkout' }] }) {
      setLoading(false)
      setCheckoutError(detail)
    }
  }

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
      const order = await checkout(cartId, values)

      const {
        paymentMethod: { id: payment }
      } = await stripe.createPaymentMethod('card')

      const {
        payment_intent: { client_secret, status: payment_intent_status },
        id: transactionId
      } = await pay({
        gateway: 'stripe_payment_intents',
        method: 'purchase',
        orderId: order.id,
        payment
      })

      if (payment_intent_status === 'requires_action') {
        const { error } = await stripe.handleCardAction(client_secret)

        if (error)
          throw {
            status: 401,
            detail: 'Payment authentication failed. Please check and try again'
          }

        await confirmTransaction({
          orderId: order.id,
          gateway: 'stripe_payment_intents',
          payment,
          transactionId
        })
      }

      cardElement.clear()

      await setOrder(order)
      await deleteCart()
      await setPaid(true)
      await getAllOrders()
    } catch ({ errors: [{ detail = 'Unable to process payment' }] }) {
      setCheckoutError(detail)
    }
  }

  return (
    <React.Fragment>
      <PageTitle title="Checkout" />

      <div className="flex flex-wrap lg:-mx-4">
        <div className="lg:p-4 w-full lg:w-3/5">
          <Form
            onSubmit={handleSubmit}
            validate={validate}
            initialValues={initialValues}
          >
            {({ handleSubmit, submitting, invalid, values, form }) => {
              const onStripeChange = e => form.change('stripe', e)

              if (
                addressesList &&
                addressesList.length > 0 &&
                checkedShippingAddress
              ) {
                values.shipping_address = shippingAddressData
              }
              if (
                addressesList &&
                addressesList.length > 0 &&
                checkedBillingAddress
              ) {
                values.billing_address = billingAddressData
              }

              if (
                addressesList &&
                addressesList.length > 0 &&
                !checkedShippingAddress
              ) {
                delete values.shipping_address
              }

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

                  {shippingStep && (
                    <React.Fragment>
                      <div>
                        <h2 className="text-black font-medium leading-loose p-0 mb-3 pt-6 pb-3 border-b border-grey-light">
                          Contact information
                        </h2>
                        {fullName && email ? (
                          <div className="mt-4">
                            <div className="my-4">
                              <span>Email: {email}</span>
                            </div>
                            <div className="my-4">
                              <span>Full Name: {fullName}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="md:flex -mx-2">
                            <div className="my-2 w-full px-2">
                              <Input
                                name="customer.name"
                                label="Full name"
                                required
                                autoFocus
                              />
                            </div>

                            <div className="my-2 w-full px-2">
                              <Input
                                type="email"
                                name="customer.email"
                                label="Email"
                                required
                              />
                            </div>
                          </div>
                        )}

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
                      </div>

                      <div>
                        <h2 className="text-black font-medium leading-loose p-0 mb-3 pt-6 pb-3 border-b border-grey-light">
                          Shipping address
                        </h2>
                        <div className="flex flex-wrap">
                          {addressesList &&
                            addressesList.length > 0 &&
                            addressesList.map(el => (
                              <ul key={el.id} className="w-1/2 p-0 list-reset">
                                <li className="flex">
                                  <input
                                    type="radio"
                                    name={el.id}
                                    className="mt-1"
                                    id={el.id}
                                    value={el.name}
                                    checked={checkedShippingAddress === el.id}
                                    onChange={() =>
                                      selectShippingAddress(el.id, el)
                                    }
                                  />
                                  <label className="ml-2 mb-2" htmlFor={el.id}>
                                    <div>
                                      {el.first_name} {el.last_name}
                                    </div>
                                    <div>{el.line_1}</div>
                                    <div>
                                      {el.city}, {el.county}, {el.country}
                                    </div>
                                    <div>{el.postcode}</div>
                                  </label>
                                </li>
                              </ul>
                            ))}
                        </div>
                        {addressesList && addressesList.length ? (
                          <Link
                            to="/addresses"
                            className="block px-4 py-2 text-gray-800 hover:text-black bg-blue no-underline hover:underline"
                          >
                            Add new Addresses
                          </Link>
                        ) : (
                          <div>
                            <AddressFields
                              type="shipping_address"
                              form={form}
                              showAddressForm={false}
                            />
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  )}

                  {paymentStep && (
                    <React.Fragment>
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
                          <div className="flex flex-wrap">
                            {addressesList &&
                              addressesList.length > 0 &&
                              addressesList.map(el => (
                                <ul
                                  key={el.id}
                                  className="w-1/2 p-0 list-reset"
                                >
                                  <li className="flex">
                                    <input
                                      type="radio"
                                      name={el.id}
                                      className="mt-1"
                                      id={el.id}
                                      value={el.name}
                                      checked={checkedBillingAddress === el.id}
                                      onChange={() =>
                                        selectBillingAddress(el.id, el)
                                      }
                                    />
                                    <label
                                      className="ml-2 mb-2"
                                      htmlFor={el.id}
                                    >
                                      <div>
                                        {el.first_name} {el.last_name}
                                      </div>
                                      <div>{el.line_1}</div>
                                      <div>
                                        {el.city}, {el.county}, {el.country}
                                      </div>
                                      <div>{el.postcode}</div>
                                    </label>
                                  </li>
                                </ul>
                              ))}
                            {addressesList && addressesList.length ? (
                              <div className="w-full">
                                <Link
                                  to="/addresses"
                                  className="block px-4 py-2 text-gray-800 hover:text-black bg-blue no-underline hover:underline"
                                >
                                  Add new Addresses
                                </Link>
                              </div>
                            ) : (
                              <div className="w-full">
                                <AddressFields
                                  type="billing_address"
                                  form={form}
                                  showAddressForm={false}
                                />
                              </div>
                            )}
                          </div>
                        )}
                        {!addressesList && (
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
                        )}
                        {values.createCustomer && (
                          <div className="my-2 w-full">
                            <Input
                              type="password"
                              name="customer.password"
                              label="Password"
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <h2 className="text-black font-medium leading-loose p-0 mb-3 pt-6 pb-3 border-b border-grey-light">
                          Payment method
                        </h2>

                        <div className="my-2 w-full">
                          <div className="bg-yellow text-sm p-3 my-6">
                            Use the test card{' '}
                            <pre className="inline">4242 4242 4242 4242</pre>{' '}
                            and any future expiry and CVC below to checkout.
                          </div>

                          <CardElement
                            onChange={onStripeChange}
                            onReady={el => setCardElement(el)}
                            hidePostalCode={true}
                            id="payment"
                            style={{
                              base: {
                                color: '#131313',
                                fontFamily:
                                  '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
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
                      </div>
                    </React.Fragment>
                  )}

                  <button
                    disabled={submitting || invalid || loading}
                    type="submit"
                    className="block w-full appearance-none bg-black border border-black text-white hover:text-white px-4 py-3 leading-tight rounded-none focus:outline-none mt-4 no-underline"
                  >
                    {paymentStep
                      ? `Confirm and Pay ${subTotal}`
                      : 'Continue to payment'}
                  </button>
                </form>
              )
            }}
          </Form>
        </div>

        <div className="hidden lg:block p-4 w-full lg:w-2/5">
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
