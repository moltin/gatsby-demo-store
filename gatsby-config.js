require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: 'Elastic Path demo store',
    description:
      'The official Elastic Path demo store.',
    author: '@moltin',
    url: process.env.DEPLOY_PRIME_URL || process.env.URL || 'localhost:8000'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#131313',
        theme_color: '#131313',
        display: 'minimal-ui',
        icon: 'src/images/i-love-lamp-icon.png'
      }
    },
    {
      resolve: '@moltin/gatsby-source-moltin',
      options: {
        client_id: process.env.GATSBY_MOLTIN_CLIENT_ID
      }
    },
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        tailwind: true,
        purgeOnly: ['src/styles/main.css'],
        whitelistPatterns: ['/^ap-/', '^algolia-', '/^ais-']
      }
    },
    'gatsby-plugin-stripe',
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: [
          {
            query: `
            {
              allMoltinProduct {
                nodes {
                  objectID: id
                  name
                  slug
                  imgUrl: mainImageHref
                  meta {
                    display_price {
                      with_tax {
                        formatted
                      }
                    }
                  }
                  price {
                    amount
                  }
                  categories {
                    name
                  }
                  brands {
                    name
                  }
                  collections {
                    name
                  }
                }
              }
            }
          `,
            transformer: ({
              data: {
                allMoltinProduct: { nodes }
              }
            }) =>
              nodes.map(
                ({ meta, categories, brands, collections, price, ...rest }) => ({
                  ...rest,
                  price: meta.display_price.with_tax.formatted,
                  categories: categories
                    ? categories.map(({ name }) => name)
                    : [],
                  brands: brands ? brands.map(({ name }) => name) : [],
                  collections: collections
                    ? collections.map(({ name }) => name)
                    : [],
                  amount: price
                  ? price[0].amount
                  : null,
                })
              ),
            indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME
          }
        ]
      }
    }
  ]
}
