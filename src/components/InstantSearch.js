import React, { useState } from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, connectAutoComplete } from 'react-instantsearch-dom'
import { Link } from 'gatsby'
import cx from 'classnames'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_API_KEY
)

const Autocomplete = ({ hits, currentRefinement, refine }) => {
  const [isOpen, setIsOpen] = useState(false)

  function onChange(event) {
    openSearch()
    refine(event.currentTarget.value)
  }

  function openSearch() {
    setIsOpen(true)
  }

  function closeDropdown() {
    setIsOpen(false)
  }

  const resultsClass = cx(
    'bg-white fixed pin-t pin-l pin-r w-full z-50 h-screen overflow-none p-2 md:p-12',
    {
      hidden: !isOpen,
      block: isOpen
    }
  )

  if (!isOpen) {
    return (
      <button
        onClick={openSearch}
        className="appearance-none p-0 focus:outline-none"
      >
        <svg
          class="h-4 mt-1 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19.71,18.29,16,14.61A9,9,0,1,0,14.61,16l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,19.71,18.29ZM2,9a7,7,0,1,1,12,4.93h0s0,0,0,0A7,7,0,0,1,2,9Z"></path>
        </svg>
      </button>
    )
  }

  return (
    <div className={resultsClass}>
      <input
        type="search"
        value={currentRefinement}
        onChange={onChange}
        className="bg-white h-16 text-lg px-3 focus:outline-none w-full border-b border-grey-light"
        placeholder="Search products by name"
        aria-haspopup="results"
        autoFocus
      />

      <div
        className="bg-white w-full overflow-scroll max-h-full"
        aria-labelledby="results"
        role="results"
        tabIndex="-1"
      >
        {hits.map(hit => (
          <Link
            to={`/products/${hit.slug}`}
            onClick={closeDropdown}
            key={hit.objectID}
            className="flex items-center no-underline focus:bg-grey-light p-2 hover:bg-grey-lightest focus:bg-grey-lightest focus:outline-none group"
            role="option"
          >
            <div className="w-24 mr-4">
              <img src={hit.imgUrl} title={hit.name} role="presentation" />
            </div>
            <div>
              <strong className="block text-grey-dark group-focus:text-black">
                {hit.name}
              </strong>
              <span className="text-grey-lighter text-sm">{hit.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const CustomAutoComplete = connectAutoComplete(Autocomplete)

const CustomInstantSearch = () => (
  <InstantSearch
    indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
    searchClient={searchClient}
  >
    <CustomAutoComplete />
  </InstantSearch>
)

export default CustomInstantSearch
