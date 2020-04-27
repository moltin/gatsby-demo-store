import React, { useContext, useState } from 'react'

import { CustomerContext } from '../context'
import { Form } from 'react-final-form'
import AddressFields from '../components/AddressFields'
import SideMenu from '../components/SideMenu'
import addressValidation from '../validation/address'

function AddressPage() {
  const { addressesList } = useContext(CustomerContext)
  const { addAddress, removeAddress, updateAddress } = useContext(
    CustomerContext
  )
  const [showForm, setShowForm] = useState(false)
  const [isEditMode, setEditMode] = useState(false)
  const [editAddressId, setEditAddressId] = useState('')
  const [addressError, setAddressError] = useState('')
  const type = 'shipping_address'

  function clearAddressForm(form) {
    form.change(`${type}.first_name`, '')
    form.change(`${type}.last_name`, '')
    form.change(`${type}.line_1`, '')
    form.change(`${type}.line_2`, '')
    form.change(`${type}.city`, '')
    form.change(`${type}.county`, '')
    form.change(`${type}.country`, '')
    form.change(`${type}.postcode`, '')
  }

  async function onSubmit(data, form) {
    try {
      const {
        first_name,
        last_name,
        line_1,
        line_2,
        city,
        postcode,
        county,
        country
      } = data[`${type}`]
      if (isEditMode) {
        await updateAddress(
          editAddressId,
          first_name,
          last_name,
          line_1,
          line_2,
          city,
          postcode,
          county,
          country
        )
        setEditMode(false)
      } else {
        await addAddress(
          first_name,
          last_name,
          line_1,
          line_2,
          city,
          postcode,
          county,
          country
        )
        setShowForm(false)
        setAddressError(null)
      }
      clearAddressForm(form)
    } catch ({ errors: [{ detail = 'Incorrect details. Try again.' }] }) {
      setAddressError(detail)
    }
  }

  function editAddress(address, form) {
    setEditMode(true)
    setEditAddressId(address.id)

    form.change(`${type}.first_name`, address.first_name)
    form.change(`${type}.last_name`, address.last_name)
    form.change(`${type}.line_1`, address.line_1)
    form.change(`${type}.line_2`, address.line_2)
    form.change(`${type}.city`, address.city)
    form.change(`${type}.county`, address.county)
    form.change(`${type}.country`, address.country)
    form.change(`${type}.postcode`, address.postcode)
  }

  function showAddAddressForm() {
    setShowForm(true)
  }

  function hideAddAddressForm(form) {
    clearAddressForm(form)
    setShowForm(false)
    setEditMode(false)
    setAddressError(null)
  }

  function validate(values) {
    return addressValidation(values)
  }

  return (
    <React.Fragment>
      <div className="sm:flex sm:flex-wrap ">
        <SideMenu />
        <div className="flex-1 text-grey-darker px-4 py-2 m-2 mb-4">
          <h3 className="my-4">Address Book</h3>
          {addressError && (
            <div className="bg-red text-white p-3 text-center">
              {addressError}
            </div>
          )}
          <Form onSubmit={onSubmit} validate={validate}>
            {({ handleSubmit, submitting, invalid, form }) => {
              return (
                <form onSubmit={handleSubmit}>
                  {showForm || isEditMode ? (
                    <React.Fragment>
                      <AddressFields
                        type={type}
                        form={form}
                        showAddressForm={true}
                      />

                      <div className="md:flex md:-mx-2">
                        <button
                          onClick={() => {
                            hideAddAddressForm(form)
                          }}
                          type="button"
                          className="my-2 w-full px-2 appearance-none bg-black border border-black text-white hover:text-white px-4 py-3 md:mx-2 leading-tight rounded-none focus:outline-none mt-4 no-underline"
                        >
                          Cancel
                        </button>

                        <button
                          disabled={submitting || invalid}
                          type="submit"
                          className="my-2 w-full px-2 appearance-none bg-black border border-black text-white hover:text-white px-4 py-3 md:mx-2 leading-tight rounded-none focus:outline-none mt-4 no-underline"
                        >
                          {isEditMode ? 'Save' : 'Add New Address'}
                        </button>
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {addressesList && addressesList.length > 0 ? (
                        <div className="flex flex-wrap mb-4">
                          {addressesList.map(address => (
                            <div key={address.id} className="w-1/2 pl-2">
                              <ul className="list-reset pb-2">
                                <li>
                                  {address.first_name} {address.last_name}
                                </li>
                                <li>{address.line_1}</li>
                                <li>
                                  {address.city}, {address.county},{' '}
                                  {address.country}
                                </li>
                                <li>{address.postcode}</li>
                              </ul>
                              <div className="max-w-sm">
                                <button
                                  onClick={() => {
                                    editAddress(address, form)
                                  }}
                                  type="button"
                                  className="mr-4 text-grey text-sm appearance-none bg-transparent underline"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    removeAddress(address.id)
                                  }}
                                  type="button"
                                  className="mr-4 text-grey text-sm appearance-none bg-transparent underline"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>No addresses</div>
                      )}

                      <button
                        type="button"
                        onClick={showAddAddressForm}
                        className="mr-4 w-48 appearance-none bg-black border border-black text-white hover:text-white px-4 py-3 leading-tight rounded-none focus:outline-none mt-4 no-underline"
                      >
                        Add New Address
                      </button>
                    </React.Fragment>
                  )}
                </form>
              )
            }}
          </Form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AddressPage
