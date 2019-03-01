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

      allCategories: allMoltinCategory {
        edges {
          node {
            id
            slug
          }
        }
      }

      allCollections: allMoltinCollection {
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
        id
      }
    })
  })

  pages.data.allCategories.edges.forEach(({ node: { id, slug } }) => {
    createPage({
      path: `/categories/${slug}`,
      component: path.resolve('./src/templates/CategoryPage.js'),
      context: {
        id
      }
    })
  })

  pages.data.allCollections.edges.forEach(({ node: { id, slug } }) => {
    createPage({
      path: `/collections/${slug}`,
      component: path.resolve('./src/templates/CollectionPage.js'),
      context: {
        id
      }
    })
  })
}
