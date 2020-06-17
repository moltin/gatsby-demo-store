const path = require('path')
const { paginate } = require('gatsby-awesome-pagination')

const itemsPerPage = parseInt(process.env.GATSBY_ITEMS_PER_PAGE) || 9

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type childrenData {
      id: String
    }
    type MoltinCategoryChildren {
      parent: MoltinCategory
      children: [childrenData]
    }
    
    type ProductMetaVariationsOption {
      id: String
      name: String
      description: String
    }
    
    type ProductMetaVariation {
      id: String
      name: String
      options: [ProductMetaVariationsOption]
    }
    
    type ProductMeta {
      variations: [ProductMetaVariation]
    }
    
    type MoltinProduct implements Node @infer {
      meta: ProductMeta
    }
  `
  createTypes(typeDefs)
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Query: {
      allMoltinCategoryChildren: {
        type: '[MoltinCategoryChildren]',
        resolve(source, args, context, info) {
          const categories = context.nodeModel.getAllNodes({
            type: `MoltinCategory`,
          })
          return categories.map(category => {
            const empty = !category.relationships.children;
            return {
              parent: category,
              children: empty ? [] : category.relationships.children.data,
            }
          })
        }
      }
    }
  }
  createResolvers(resolvers)
}

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const pages = await graphql(`
    {
      allProducts: allMoltinProduct(filter: {parent: {id: {eq: null}}}) {
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
        items: items || [],
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
