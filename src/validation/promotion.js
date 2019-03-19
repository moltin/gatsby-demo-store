const promotionValidation = values => {
  const errors = {}

  if (!values.code) {
    errors.code = 'Required'
  }

  return errors
}

export default promotionValidation
