import React from 'react'
import { Link } from 'gatsby'
import ArrowLeft from '../images/arrow_left.svg'

import PageTitle from '../components/PageTitle'

function OrderPage({ location }) {
  const orderData = location.state && location.state.data

  return (
    <React.Fragment>
      <Link to="/orders" className="no-underline hover:underline">
        <img className="align-middle pb-1" src={ArrowLeft} alt="arrow icon" />
        Back
      </Link>

      <PageTitle title="Purchase details" />
      {orderData && (
        <div className="flex flex-wrap ">
          <div className="flex-auto text-grey-darker px-4 py-2 m-2 mb-4">
            <div className="pb-6 text-2xl">Summary</div>
            <table className="w-full">
              <tbody>
                <tr className="bg-grey-light py-4">
                  <td className="p-2">Status:</td>
                  <td className="p-2">{orderData.status}</td>
                </tr>
                <tr className="py-4">
                  <td className="p-2">Order Tax Total:</td>
                  <td className="p-2">
                    {orderData.meta.display_price.tax.formatted}
                  </td>
                </tr>
                <tr className="bg-grey-light py-4">
                  <td className="p-2">Order Purchase Date:</td>
                  <td className="p-2">
                    {orderData.meta.timestamps.created_at}
                  </td>
                </tr>
                <tr className="py-4">
                  <td className="p-2">Order Total:</td>
                  <td className="p-2">
                    {orderData.meta.display_price.with_tax.formatted}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="py-4 w-full">
              <div className="w-1/3 m-0 inline-block">
                <span className="text-2xl">Shipping Address</span>
                <div>
                  <div>
                    {orderData.shipping_address.first_name}{' '}
                    {orderData.shipping_address.last_name}
                  </div>
                  <div>{orderData.shipping_address.line_1}</div>
                  <div>
                    {orderData.shipping_address.city},{' '}
                    {orderData.shipping_address.county},{' '}
                    {orderData.shipping_address.country}
                  </div>
                  <div>{orderData.shipping_address.postcode}</div>
                </div>
              </div>
              <div className="w-1/3 m-0 inline-block">
                <span className="text-2xl">Billing Address</span>
                <div>
                  <div>
                    {orderData.billing_address.first_name}{' '}
                    {orderData.billing_address.last_name}
                  </div>
                  <div>{orderData.billing_address.line_1}</div>
                  <div>
                    {orderData.billing_address.city},{' '}
                    {orderData.billing_address.county},{' '}
                    {orderData.billing_address.country}
                  </div>
                  <div>{orderData.billing_address.postcode}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default OrderPage
