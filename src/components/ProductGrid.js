import React from 'react'

import LayoutSwitcher from './LayoutSwitcher'
import Product from './Product'

export default function ProductGrid({ loading, products }) {
  if (!products) {
    return <p>No products.</p>
  }

  return (
    <React.Fragment>
      <div className="my-3">
        <LayoutSwitcher />
      </div>

      <div className="flex flex-wrap -mx-5">
        {loading ? (
          <img
            src="/static/images/loading.svg"
            title="Loading"
            className="mx-auto"
            alt="Loading"
          />
        ) : (
          products.map(product => <Product {...product} key={product.id} />)
        )}
      </div>
    </React.Fragment>
  )
}
