import React from 'react'
import { Link } from 'gatsby'

export default function SideMenu() {
  return (
    <div className="text-grey-darker bg-grey-light px-2 py-2 m-2 sm:h-48 sm:w-48">
      <Link
        to="/profile"
        className="block px-4 py-2 text-gray-800 hover:text-black bg-blue no-underline hover:underline"
      >
        My Profile
      </Link>
      <Link
        to="/orders"
        className="block px-4 py-2 text-gray-800 hover:text-black bg-blue no-underline hover:underline"
      >
        Purchase History
      </Link>
      <Link
        to="/addresses"
        className="block px-4 py-2 text-gray-800 hover:text-black bg-blue no-underline hover:underline"
      >
        Address Book
      </Link>
    </div>
  )
}
