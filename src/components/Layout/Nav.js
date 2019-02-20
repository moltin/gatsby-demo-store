import React, { useContext } from 'react'
import { Link } from 'gatsby'

import { CartContext } from '../CartContext'

function Nav({ categories }) {
  const { count } = useContext(CartContext)

  return (
    <nav className="ml-auto">
      <ul className="list-reset flex items-center">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>

        <li className="inline-block relative nav-item dropdown">
          <Link to="/products">All Products</Link>

          <ul className="nav-item-dropdown block">
            {categories.map(category => (
              <li key={category.id}>
                <Link
                  to={`/category/${category.slug}`}
                  className="nav-item-dropdown-link"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        <li className="nav-item">
          <Link to="/about">About</Link>
        </li>

        <li className="nav-item">
          <Link to="/cart">Cart ({count})</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
