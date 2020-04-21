import React, { useContext, useState } from 'react'
import { Link } from 'gatsby'

import { CartContext } from '../../context'
import AccountIcon from '../../images/icons/account-icon.svg'

import { CustomerContext } from '../../context'

import Logo from '../../images/logo.svg'

function Header({ siteTitle, collections }) {
  const { count, isEmpty } = useContext(CartContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { logout, isLoggedIn } = useContext(CustomerContext)
  const { setDefaultCartId } = useContext(CartContext)

  function handleOpenModal() {
    setIsModalOpen(!isModalOpen)
  }

  async function onLogout() {
    await logout()
    await setDefaultCartId()
  }

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

          <li className="nav-item relative mx-1 px-1 py-2 group mb-1 md:mb-0">
            <Link to="/collections">Collections</Link>

            <div className="absolute pin-l pin-t mt-2 py-3 px-4 rounded shadow-lg bg-white z-10 hidden group-hover:block">
              <ul className="whitespace-no-wrap list-reset">
                {collections.nodes.map(collection => (
                  <li key={collection.id}>
                    <Link
                      to={`/collections/${collection.slug}`}
                      className="block text-grey hover:text-black no-underline my-1"
                    >
                      {collection.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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
          <li className="nav-item">
            <Link to="/search">
              <svg
                className="h-4 fill-current text-black"
                viewBox="0 0 56.966 56.966"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m55.146 51.887-13.558-14.101c3.486-4.144 5.396-9.358 5.396-14.786 0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837 1.192-1.147 1.23-3.049.083-4.242zm-31.162-45.887c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z" />
              </svg>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart">
              <span className="relative inline-flex items-center">
                <svg
                  viewBox="0 0 16 17"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  className="inline-block h-4 "
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
                      <g transform="translate(64.000000, 48.000000)">
                        <g transform="translate(1262.000000, 0.000000)">
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
                  <span className="md:inline-flex rounded-full bg-yellow -mt-3 -ml-0 md:p-3 h-2 md:h-4 w-2 md:w-4 md:items-center md:justify-center">
                    <span className="hidden md:inline text-black text-xs font-semibold">
                      {count}
                    </span>
                  </span>
                )}
              </span>
            </Link>
          </li>
          <li className="nav-item">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={handleOpenModal}
                  className="relative z-10 block w-6 rounded-full overflow-hidden border-gray-600 focus:outline-none focus:border-white"
                >
                  <img
                    className="h-full w-full object-cover"
                    src={AccountIcon}
                    alt="Your avatar"
                  />
                </button>
                {isModalOpen && (
                  <div className="absolute z-20 pin-r mt-2 py-2 w-32 bg-white rounded-lg shadow-xl border">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:text-black bg-blue no-underline hover:underline"
                    >
                      Profile
                    </Link>
                    <a
                      onClick={onLogout}
                      href="/"
                      className="block px-4 py-2 text-gray-800 hover:text-black bg-blue no-underline hover:underline"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <span className="relative inline-flex items-center">Login</span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
