import React, { useContext, useState } from 'react'

import { CustomerContext } from '../context'
import { Form } from 'react-final-form'
import Input from '../components/Input'
import SideMenu from '../components/SideMenu'

function ProfilePage() {
  const { fullName, email } = useContext(CustomerContext)
  const { updateCustomerInfo } = useContext(CustomerContext)
  const [customerError, setCustomerError] = useState(null)
  const [isEditData, setIsEditData] = useState(false)

  async function onSubmit({ name, email, password }) {
    try {
      await updateCustomerInfo(name, email, password)
      handleHideEditData()
    } catch ({ errors: [{ detail = 'Incorrect details. Try again.' }] }) {
      setCustomerError(detail)
    }
  }

  function handleHideEditData() {
    setIsEditData(false)
    setCustomerError(null)
  }

  function handleShowEditData() {
    setIsEditData(true)
  }

  return (
    <React.Fragment>
      <div className="sm:flex sm:flex-wrap ">
        <SideMenu />

        <div className="flex-1 text-grey-darker px-4 py-2 m-2 mb-2">
          <h3 className="my-4">Personal Information</h3>

          <div className="max-w-sm">
            <div className="my-2">
              <div className="mt-4">
                <div className="my-4">
                  <span>Email: {email}</span>
                </div>
                <div className="my-4">
                  <span>Full Name: {fullName}</span>
                </div>
              </div>
              {customerError && (
                <div className="bg-red text-white p-3 text-center">
                  {customerError}
                </div>
              )}
            </div>
            {isEditData ? (
              <Form onSubmit={onSubmit}>
                {({ handleSubmit, submitting, invalid }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <div className="mt-4">
                        <div className="my-4">
                          <Input
                            type="email"
                            name="email"
                            label="Email"
                            placeholder={email}
                          />
                        </div>
                      </div>
                      <div className="my-4">
                        <Input
                          type="name"
                          name="name"
                          label="Full Name"
                          placeholder={fullName}
                        />
                        <div>
                          <div className="my-4">
                            <Input
                              type="password"
                              name="password"
                              label="Password"
                            />
                          </div>
                          <button
                            disabled={submitting || invalid}
                            type="submit"
                            className="mr-4 w-48 appearance-none bg-black border border-black text-white hover:text-white px-4 py-3 leading-tight rounded-none focus:outline-none mt-4 no-underline"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleHideEditData}
                            className="w-48 appearance-none bg-white border border-black text-black px-4 py-3 leading-tight rounded-none focus:outline-none mt-4 no-underline"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  )
                }}
              </Form>
            ) : (
              <button
                onClick={handleShowEditData}
                type="button"
                className="mr-4 w-48 appearance-none bg-black border border-black text-white hover:text-white px-4 py-3 leading-tight rounded-none focus:outline-none mt-4 no-underline"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProfilePage
