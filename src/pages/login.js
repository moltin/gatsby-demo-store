import React, { useContext } from 'react'

import { Customerkit } from '../shopkit'
import PageTitle from '../components/PageTitle'

export default function CartPage() {
  const { login } = useContext(Customerkit)

  return (
    <React.Fragment>
      <PageTitle title="Login" />

      <button onClick={() => login('hi+100@jamiebarton.co.uk', 'gravity')}>
        Login as Jamie
      </button>
    </React.Fragment>
  )
}
