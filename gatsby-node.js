const path = require('path')
const { paginate } = require('gatsby-awesome-pagination')

const itemsPerPage = parseInt(process.env.GATSBY_ITEMS_PER_PAGE) || 9

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
            products {
              id
            }
          }
        }
      }

      allCollections: allMoltinCollection {
        edges {
          node {
            id
            slug
            products {
              id
            }
          }
        }
      }
    }
  `)

  paginate({
    createPage,
    items: pages.data.allProducts.edges,
    itemsPerPage,
    pathPrefix: '/products',
    component: path.resolve('src/templates/ProductsList.js')
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

  pages.data.allCategories.edges.forEach(
    ({ node: { id, slug, products: items } }) => {
      paginate({
        createPage,
        items,
        itemsPerPage,
        pathPrefix: `/categories/${slug}`,
        component: path.resolve('src/templates/CategoryPage.js'),
        context: {
          id
        }
      })
    }
  )

  pages.data.allCollections.edges.forEach(
    ({ node: { id, slug, products: items } }) => {
      paginate({
        createPage,
        items,
        itemsPerPage,
        pathPrefix: `/collections/${slug}`,
        component: path.resolve('src/templates/CollectionPage.js'),
        context: {
          id
        }
      })
    }
  )
}
