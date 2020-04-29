import React, { useState } from 'react'
import { Link } from 'gatsby'

import Logo from '../../images/logo.svg'
import ArrowDown from '../../images/arrow_down.svg'

export default function Footer({ categories }) {
  const subCategories = categories.filter(el => el.children.length > 0)
  const subCategoriesId = subCategories.map(el => el.children)

  subCategories.forEach((subCategory, index) => {
    subCategory.children.forEach((el, i) => {
      const newEl = categories.filter(elem => elem.parent.id === el.id)
      subCategories[index].children[i] = newEl[0].parent
    })
  })

  let categoriesArr = [...categories]

  if (subCategoriesId.length > 0) {
    subCategoriesId[0].forEach(category => {
      categoriesArr = categoriesArr.filter(el => el.parent.id !== category.id)
    })
  }

  const initialValue = Array(categoriesArr.length).fill(false)

  const [isOpen, setIsOpen] = useState(initialValue)

  function handleOpenDropdown(value, index, e) {
    let isOpenCopy = [...isOpen]
    isOpenCopy[index] = !value
    setIsOpen(isOpenCopy)

    if (!value) {
      document.addEventListener('click', clickListener)

      e.preventDefault()
      e.stopPropagation()
    }
  }

  function clickListener() {
    setIsOpen(initialValue)
    document.removeEventListener('click', clickListener)
  }

  return (
    <footer className="block py-6 -px-2 md:py-12 md:flex">
      <div className="list-reset md:w-1/4 text-center md:text-left">
        <Link to="/" className="text-grey-dark hover:text-black no-underline">
          <img src={Logo} alt="Elastic Path Commerce Cloud demo store" />
        </Link>
      </div>

      <ul className="list-reset px-2 mb-3 md:mb-0 md:w-1/4 leading-loose my-3 text-center md:text-left">
        <li className="font-semibold md:mb-3 text-grey text-sm uppercase">
          Categories
        </li>
        {categoriesArr.map((category, index) => (
          <li key={category.id}>
            {category.children.length > 0 ? (
              <div className="relative">
                <button
                  onClick={e => handleOpenDropdown(isOpen[index], index, e)}
                  className="text-grey-dark align-top hover:text-black focus:outline-none"
                >
                  <span className="align-middle leading-loose">
                    {category.parent.name}
                  </span>
                  <img
                    className="align-middle"
                    src={ArrowDown}
                    alt="arrow icon"
                  />
                </button>
                <div
                  className={`${
                    isOpen[index] ? 'block' : 'hidden'
                  } absolute z-20 pin-x mt-2 text-center md:text-left`}
                >
                  <div className="inline-block py-2 w-24 bg-white rounded-lg shadow-xl text-center border shadow">
                    {category.children.map(subCategory => (
                      <div key={subCategory.id}>
                        <Link
                          to={`/categories/${subCategory.slug}`}
                          className="text-grey-dark hover:text-black no-underline"
                        >
                          {subCategory.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to={`/categories/${category.parent.slug}`}
                className="text-grey-dark hover:text-black no-underline"
              >
                {category.parent.name}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <ul className="list-reset px-2 mb-3 md:mb-0 md:w-1/4 leading-loose my-3 text-center md:text-left">
        <li className="font-semibold md:mb-3 text-grey text-sm uppercase">
          Information
        </li>
        <li>
          <Link to="/" className="text-grey-dark hover:text-black no-underline">
            About
          </Link>
        </li>
        <li>
          <Link to="/" className="text-grey-dark hover:text-black no-underline">
            Shipping &amp; Returns
          </Link>
        </li>
        <li>
          <Link to="/" className="text-grey-dark hover:text-black no-underline">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link to="/" className="text-grey-dark hover:text-black no-underline">
            Terms &amp; Conditions
          </Link>
        </li>
      </ul>

      <ul className="list-reset px-2 mb-3 md:mb-0 md:w-1/4 leading-loose my-3 text-center md:text-left">
        <li className="font-semibold md:mb-3 text-grey text-sm uppercase">
          Social
        </li>
        <li>
          <Link
            to="/"
            className="text-grey-dark hover:text-black no-underline inline-flex items-center"
          >
            <svg
              className="fill-current w-4 mr-2"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
            </svg>
            Instagram
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="text-grey-dark hover:text-black no-underline inline-flex items-center"
          >
            <svg
              className="fill-current w-4 mr-2"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0" />
            </svg>
            Facebook
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="text-grey-dark hover:text-black no-underline inline-flex items-center"
          >
            <svg
              className="fill-current w-4 mr-2"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
            </svg>
            Twitter
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="text-grey-dark hover:text-black no-underline inline-flex items-center"
          >
            <svg
              className="fill-current w-4 mr-2"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
            </svg>
            Pinterest
          </Link>
        </li>
      </ul>
    </footer>
  )
}
