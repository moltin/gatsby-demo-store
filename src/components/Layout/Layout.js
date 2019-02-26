import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { StripeProvider } from 'react-stripe-elements'

import Header from './Header'
import Banner from './Banner'
import Footer from './Footer'

import '../../styles/main.css'

export default function Layout({ children }) {
  const {
    site,
    allMoltinCategory: { edges: categories }
  } = useStaticQuery(categoriesQuery)

  return (
    <StripeProvider apiKey="pk_test_qBzZekHWVR1PYb1wufidEfHJ">
      <div className="container">
        <Header siteTitle={site.siteMetadata.title} />
        <main>{children}</main>
        <Banner />
        <Footer categories={categories} />
      </div>
    </StripeProvider>
  )
}

const categoriesQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMoltinCategory {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`
