import React from 'react'
import { values, any, identity } from 'ramda'
import { Button } from '@material-ui/core'

const SubmitButton = ({ label, onSubmit, disabled, fieldData, pristine, errors, questionCode }) => {
  const handleSubmit = () => onSubmit({ ask: fieldData })

  const anyErrors = any(identity)(values(errors))

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleSubmit}
      disabled={disabled || pristine || anyErrors}
      test-id={questionCode}
    >
      {label}
    </Button>
  )
}

export default SubmitButton
