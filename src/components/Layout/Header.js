import React from 'react'
import { Link } from 'gatsby'

import Nav from './Nav'
import Logo from '../../images/logo.svg'

function Header({ siteTitle, categories }) {
  return (
    <header className="py-6 md:py-8 flex items-center justify-between relative">
      <Link to="/">
        <img src={Logo} className="block" title={siteTitle} alt={siteTitle} />
      </Link>

      <Nav categories={categories} />
    </header>
  )
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
