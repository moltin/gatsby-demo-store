import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Header from './Header'
import Banner from './Banner'
import Footer from './Footer'

import '../../styles/main.css'

function Layout({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <div className="container">
          <Header siteTitle={data.site.siteMetadata.title} categories={[]} />

          <main>{children}</main>

          <Banner />
          <Footer categories={[]} />
        </div>
      )}
    />
  )
}

export default Layout
