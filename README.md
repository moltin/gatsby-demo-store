<img src="https://www.elasticpath.com/themes/custom/bootstrap_sass/logo.svg" alt="" width="400" />

# Elastic Path Commerce Cloud Gatsby Starter

[![Netlify Status](https://api.netlify.com/api/v1/badges/5be5979f-5b09-450b-951b-1b192be93d65/deploy-status)](https://app.netlify.com/sites/gatsby-demo-store/deploys)
[![Stable Branch](https://img.shields.io/badge/stable%20branch-master-blue.svg)](https://github.com/moltin/gatsby-demo-store)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/moltin/gatsby-demo-store/issues)
[![follow on Twitter](https://img.shields.io/twitter/follow/elasticpath?style=social&logo=twitter)](https://twitter.com/intent/follow?screen_name=elasticpath)

> 🛍 Elastic Path powered Gatsby demo store

[Demo](https://demo.elasticpath.com)

🚨 THIS IS A WIP - CONTRIBUTORS WELCOME 😍

## Setup

You'll need an [Elastic Path Commerce Cloud account](https://dashboard.elasticpath.com) to run this store.

Run the following commands in your Terminal:

```bash
gatsby new gatsby-demo-store https://github.com/moltin/gatsby-demo-store
cd gatsby-demo-store
yarn
```

Once you have the project setup, you can now configure the ENV variables required to run the project.

⚠️ You will need to create an account with [Algolia](https://algolia.com) for search and [Algolia places](https://community.algolia.com/places). Algolia is used to power the search page and Algolia places is used during the checkout process for quick address lookup.

Create a `.env` file in the root directory and add the following with your secrets:

```dosini
GATSBY_MOLTIN_CLIENT_ID=
GATSBY_STRIPE_PUBLISHABLE_KEY=
GATSBY_ALGOLIA_PLACES_APP_ID=
GATSBY_ALGOLIA_PLACES_API_KEY=
GATSBY_ALGOLIA_INDEX_NAME=
ALGOLIA_ADMIN_KEY=
GATSBY_ALGOLIA_API_KEY=
GATSBY_ALGOLIA_APP_ID=
GATSBY_ITEMS_PER_PAGE=
```

You must also configure Stripe inside the [Dashboard](https://dashboard.elasticpath.com).

Now you're ready to go!

```bash
yarn dev
```

## Terms And Conditions

- Any changes to this project must be reviewed and approved by the repository owner. For more information about contributing, see the [Contribution Guide](https://github.com/moltin/gatsby-demo-store/blob/master/.github/CONTRIBUTING.md).
- For more information about the license, see [MIT License](https://github.com/moltin/gatsby-demo-store/blob/master/LICENSE).
