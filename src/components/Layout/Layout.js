import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { ToastContainer } from 'react-toastify'

import SEO from '../SEO'
import Header from './Header'
import Banner from './Banner'
import Footer from './Footer'

import 'react-toastify/dist/ReactToastify.css'
import '../../styles/main.css'
import '../../styles/branding.css'

const toastOptions = {
  position: 'bottom-center',
  draggable: false,
  toastClassName: 'text-xl bg-black text-white text-center p-3 shadow-none',
  progressClassName: 'bg-white opacity-25',
  closeButton: false
}

export default function Layout({ children }) {
  const { site, categories, collections } = useStaticQuery(categoriesQuery)

  return (
    <div className="container">
      <SEO />
      <Header siteTitle={site.siteMetadata.title} collections={collections} />
      <main>{children}</main>
      <Banner />
      <Footer categories={categories} />
      <ToastContainer {...toastOptions} />
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

    categories: allMoltinCategoryChildren {
      children {
        id
      }
      parent {
        name
        slug
        id
      }
    }

    collections: allMoltinCollection {
      nodes {
        id
        name
        slug
      }
    }
  }
`
