import React, { useContext } from 'react'

import { CustomerContext } from '../context'
import SideMenu from '../components/SideMenu'
import { Link } from 'gatsby'

function OrderPage() {
  const { ordersList } = useContext(CustomerContext)

  return (
    <React.Fragment>
      <div className="flex flex-wrap ">
        <SideMenu />
        <div className="flex-auto text-grey-darker px-4 py-2 m-2 mb-4">
          <h3 className="my-4">Purchase History</h3>

          <div>
            {ordersList && ordersList.length ? (
              <table className="table-auto">
                <thead>
                  <tr className="bg-grey-light">
                    <th className="pr-20 pl-6 py-2">Date</th>
                    <th className="pr-20 pl-6 py2">Status</th>
                    <th className="pr-20 pl-6 py-2">Total</th>
                    <th className="pr-20 pl-6 py-2">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersList &&
                    ordersList.length &&
                    ordersList.map(element => (
                      <tr key={element.id}>
                        <td className="border pr-8 pl-4 py-2">
                          <Link
                            to="/orderdetails"
                            state={{ data: element }}
                            className="no-underline hover:underline text-black"
                          >
                            {element.meta.timestamps.created_at}
                          </Link>
                        </td>
                        <td className="border pr-8 pl-4 py-2">
                          {element.status}
                        </td>
                        <td className="border pr-8 pl-4 py-2">
                          {element.meta.display_price.with_tax.formatted}
                        </td>
                        <td className="border pr-8 pl-4 py-2">
                          {element.payment}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <div>You have no previous purchases.</div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default OrderPage
