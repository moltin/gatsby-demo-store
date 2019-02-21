import React from 'react'

export default function PageTitle({ title, description, children }) {
  if (!title && !children) return null

  return (
    <header className="page-title text-center my-6">
      <h1 className="text-black font-medium leading-loose text-center m-0 pb-6">
        {title || children}
      </h1>

      {description && <p>{description}</p>}
    </header>
  )
}
