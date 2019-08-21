const paymentValidation = values => {
  const errors = {}

  if (!values.stripe || !values.stripe.complete) {
    if (!errors.stripe) {
      errors.stripe = {}
    }

    errors.stripe.complete = 'Required'
  }
}

export default paymentValidation
