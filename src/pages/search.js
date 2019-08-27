import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'

import Filter from '../components/Filter'
import HitList from '../components/HitList'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_API_KEY
)

const SearchPage = () => (
  <InstantSearch
    indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
    searchClient={searchClient}
  >
    <Filter />
    <HitList />
  </InstantSearch>
)

export default SearchPage
