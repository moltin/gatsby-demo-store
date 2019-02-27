require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: 'I Love Lamp',
    description:
      'I love carpet. I love desk. I love lamp. I Love Lamp is the official Moltin demo store.',
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
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png'
      }
    },
    {
      resolve: '@moltin/gatsby-source-moltin',
      options: {
        client_id: process.env.MOLTIN_CLIENT_ID,
        flows: {
          product: [
            'meta_title',
            'meta_description',
            'on_sale',
            'bulb',
            'jamie',
            'bulb_qty',
            'material',
            'finish',
            'max_watt'
          ]
        }
      }
    },
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        tailwind: true,
        purgeOnly: ['src/styles/main.css']
      }
    },
    'gatsby-plugin-stripe'
  ]
}
