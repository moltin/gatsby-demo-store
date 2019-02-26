import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

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
    <div className="container">
      <Header siteTitle={site.siteMetadata.title} />
      <main>{children}</main>
      <Banner />
      <Footer categories={categories} />
    </div>
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
