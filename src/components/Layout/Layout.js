import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header'
import Banner from './Banner'
import Footer from './Footer'

import '../../styles/main.css'

export default function Layout({ children }) {
  const { site, categories, collections } = useStaticQuery(categoriesQuery)

  return (
    <div className="container">
      <Header siteTitle={site.siteMetadata.title} collections={collections} />
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

    categories: allMoltinCategory {
      nodes {
        id
        name
        slug
      }
    }

    collections: allMoltinCollection {
      nodes {
        name
        slug
      }
    }
  }
`
