import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

import Nav from './Nav'

function Header({ siteTitle, categories }) {
  return (
    <header className="py-6 md:py-8 flex items-center justify-between relative">
      <div className="w-1/3 flex items-center">
        <Nav categories={categories} />
      </div>

      <div className="w-1/3 flex items-center justify-center">
        <Link to="/" className="mx-auto">
          <img
            src="/static/images/logo.svg"
            className="block"
            title={siteTitle}
            role="presentation"
          />
        </Link>
      </div>

      <div className="w-1/3 flex items-center justify-end">
        <Link to="/cart" className="no-underline">
          Cart (0)
        </Link>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
