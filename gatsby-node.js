const path = require('path')

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const pages = await graphql(`
    {
      allProducts: allMoltinProduct {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  pages.data.allProducts.edges.forEach(({ node: { id, slug } }) => {
    createPage({
      path: `/products/${slug}`,
      component: path.resolve('./src/templates/ProductPage.js'),
      context: {
        id,
        slug
      }
    })
  })
}
