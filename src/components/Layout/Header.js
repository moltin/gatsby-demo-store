import React, { useContext } from 'react'
import { Link } from 'gatsby'

import { CartContext } from '../../context'
// import {  CustomerContext } from '../../context'

import Logo from '../../images/logo.svg'

function Header({ siteTitle }) {
  const { count, isEmpty } = useContext(CartContext)
  // const { loggedIn, user } = useContext(CustomerContext)

  return (
    <header className="py-6 md:py-10">
      <nav className="flex items-center justify-between relative">
        <ul className="list-reset items-center justify-start hidden md:flex md:w-1/3">
          <li className="nav-item">
            <Link to="/products">Products</Link>
          </li>

          <li className="nav-item">
            <Link to="/about">About</Link>
          </li>
        </ul>

        <div className="hidden md:flex md:w-1/3 flex items-center">
          <Link
            to="/"
            className="mx-auto flex items-center justify-center logo"
          >
            <img src={Logo} title={siteTitle} alt={siteTitle} />
          </Link>
        </div>

        <ul className="list-reset flex items-center justify-end md:w-1/3">
          <li className="md:hidden nav-item">
            <Link to="/products">Shop</Link>
          </li>
          {/* <li className="list-item">
            {loggedIn ? (
              <Link to="/orders">{user.name}</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li> */}
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
                  <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      transform="translate(-1367.000000, -50.000000)"
                      stroke="#131313"
                      strokeWidth="1.5"
                    >
                      <g
                        id="header"
                        transform="translate(64.000000, 48.000000)"
                      >
                        <g
                          id="cart"
                          transform="translate(1262.000000, 0.000000)"
                        >
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
                  <span className="md:inline-flex rounded-full bg-yellow -mt-2 md:mt-1 -ml-1 md:ml-2 md:p-3 h-2 md:h-4 w-2 md:w-4 md:items-center md:justify-center">
                    <span className="hidden md:inline text-black text-xs font-semibold">
                      {count}
                    </span>
                  </span>
                )}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
