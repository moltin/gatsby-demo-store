import React from 'react'
import { Link } from 'gatsby'

function Nav({ categories }) {
  return (
    <nav>
      <ul className="list-reset flex items-center">
        <li className="nav-item">
          <Link to="/about">Home</Link>
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
      </ul>
    </nav>
  )
}

export default Nav
