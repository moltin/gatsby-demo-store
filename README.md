# Moltin x Gatsby Starter

> 🛍 Moltin powered Gatsby demo store

[Demo](https://demo.moltin.com)

🚨 THIS IS A WIP - CONTRIBUTORS WELCOME 😍

## Setup

You'll need a [Moltin account](https://dashboard.moltin.com) to run this store.

Run the following commands in your Terminal:

```bash
gatsby new gatsby-demo-store https://github.com/moltin/gatsby-demo-store
cd gatsby-demo-store
yarn
```

Once you have the project setup, you can now configure the ENV variables required to run the project.

Create a `.env` file in the root directory and add the following with your secrets:

```dosini
GATSBY_MOLTIN_CLIENT_ID=
GATSBY_STRIPE_PUBLISHABLE_KEY=
GATSBY_ALGOLIA_PLACES_APP_ID=
GATSBY_ALGOLIA_PLACES_API_KEY=
```

You must also configure Stripe inside the [Dashboard](https://dashboard.moltin.com).

Now you're ready to go!

```bash
yarn dev
```
