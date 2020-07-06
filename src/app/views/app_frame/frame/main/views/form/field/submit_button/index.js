import React from 'react'
import { values, keys, any, identity, compose, pickBy, map, prop, propEq } from 'ramda'
import { Button, Typography } from '@material-ui/core'
import { Row } from '../../../../components/layouts'

const SubmitButton = ({
  label,
  onSubmit,
  disabled,
  fieldData,
  pristine,
  errors,
  questionCode,
  formFields,
}) => {
  const handleSubmit = () => onSubmit({ ask: fieldData })

  const anyErrors = any(identity)(values(errors))

  const errorNames = compose(
    map(prop('attributeName')),
    map(key => find(propEq('code', key)(formFields))),
    keys,
  )(pickBy(identity, errors))

  // todo: reinstate error checking
  return (
    <Row>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={disabled}
        test-id={questionCode}
      >
        {label}
      </Button>
    </Row>
  )
}

export default SubmitButton
