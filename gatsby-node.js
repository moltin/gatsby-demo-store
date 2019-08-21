const path = require('path')
const createPaginatedPages = require('gatsby-paginate')

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const pages = await graphql(`
    {
      allProducts: allMoltinProduct {
        edges {
          node {
            id
            name
            slug
            meta {
              display_price {
                without_tax {
                  formatted
                }
              }
            }
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

  createPaginatedPages({
    edges: pages.data.allProducts.edges,
    createPage: createPage,
    pageTemplate: 'src/templates/ProductsList.js',
    pageLength: 4,
    pathPrefix: 'products'
  })

  pages.data.allProducts.edges.forEach(({ node: { id, slug } }) => {
    createPage({
      path: `/products/${slug}`,
      component: path.resolve('./src/templates/ProductPage.js'),
      context: {
        id
      }
    })
  })

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
