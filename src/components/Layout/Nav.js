import React, { useContext } from 'react'
import { Link } from 'gatsby'

import { CartContext } from '../../context'

function Nav() {
  const { count, isEmpty } = useContext(CartContext)

  return (
    <nav className="ml-auto">
      <ul className="list-reset flex items-center">
        <li className="nav-item">
          <Link to="/products">All Products</Link>
        </li>

        <li className="nav-item">
          <Link to="/about">About</Link>
        </li>

        <li className="nav-item">
          <Link to="/cart">
            <span className="inline-flex items-center">
              <svg
                viewBox="0 0 16 17"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="inline-block h-4 mt-1"
              >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g
                    transform="translate(-1367.000000, -50.000000)"
                    stroke="#131313"
                    strokeWidth="1.5"
                  >
                    <g id="header" transform="translate(64.000000, 48.000000)">
                      <g id="cart" transform="translate(1262.000000, 0.000000)">
                        <g transform="translate(42.000000, 3.000000)">
                          <polygon id="Path-2" points="0 15 1 4 13 4 14 15" />
                          <path
                            d="M4,7 C4,2 4,0 7,0 C10,0 10,2 10,7"
                            id="Path-3"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>

              {!isEmpty && (
                <span className="inline-flex rounded-full bg-yellow text-black text-xs font-semibold mt-1 ml-2 p-3 h-4 w-4 items-center justify-center">
                  {count}
                </span>
              )}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
