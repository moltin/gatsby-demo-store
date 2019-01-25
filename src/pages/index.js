import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import ProductGrid from '../components/productGrid'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <ProductGrid />
  </Layout>
)

export default IndexPage
