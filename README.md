# Elastic Path Commerce Cloud Gatsby Starter

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
