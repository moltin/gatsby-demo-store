import React from 'react'

import { Link } from 'gatsby'

export default function Collection({ name, description, slug }) {
  return (
    <article className="px-5 py-2 w-full lg:w-1/2">
      <div className="text-center">
        <div className="flex flex-col-reverse mb-4">
          <h1 className="text-xl md:text-3xl text-black font-normal">{name}</h1>
          <span className="block text-grey my-2 md:mt-8">{description}</span>
        </div>

        <Link
          to={`/collections/${slug}`}
          className="inline-block appearance-none bg-white border border-b-3 border-black text-black px-4 py-3 leading-tight rounded-none focus:outline-none my-2 no-underline"
        >
          Discover
        </Link>
      </div>
    </article>
  )
}
