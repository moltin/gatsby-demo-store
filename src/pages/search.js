import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, Hits, SortBy, PoweredBy } from 'react-instantsearch-dom'

import PageTitle from '../components/PageTitle'
import CustomRefinementList from '../components/CustomRefinementList'
import Hit from '../components/Hit'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_API_KEY
)

const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME

function SearchPage() {
  return (
    <React.Fragment>
      <PageTitle title="Search" />

      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <div className="md:flex md:flex-wrap md:-mx-4">
          <div className="md:px-4 md:w-1/5">
            <div className="py-6">
              <h4 className="text-black text font-bold mb-3">Sort by:</h4>
              <SortBy
                defaultRefinement={indexName}
                items={[
                  { value: indexName, label: 'Featured' },
                  { value: `${indexName}_price_asc`, label: 'Price asc.' },
                  { value: `${indexName}_price_desc`, label: 'Price desc.' }
                ]}
              />
            </div>
            <CustomRefinementList title="Category" attribute="categories" />
            <CustomRefinementList title="Collection" attribute="collections" />
            <CustomRefinementList title="Brand" attribute="brands" />
          </div>

          <div className="md:px-4 md:w-4/5">
            <Hits hitComponent={Hit} />
          </div>
        </div>

        <div className="text-center py-6">
          <PoweredBy />
        </div>
      </InstantSearch>
    </React.Fragment>
  )
}

export default SearchPage
