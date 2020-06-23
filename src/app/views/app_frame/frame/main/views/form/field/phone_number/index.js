import React, { useState, useEffect } from 'react'
import { length, test } from 'ramda'
import { TextField, Typography, Grid } from '@material-ui/core'

import makeHandleUpdate from '../../helpers/make-handle-update'
import getValidationList from '../../helpers/get-validation-list'

import useStyles from './styles'

const PhoneNumberInput = ({ fieldType, label, fieldData, onUpdate, errors, setErrors }) => {
  const [value, setValue] = useState(fieldType === 'mobile' ? '4' : '')

  const [pristine, setPristine] = useState(true)
  const handleUpdate = makeHandleUpdate(onUpdate)(fieldData, setErrors)
  const validationList = getValidationList(fieldData)

  const {
    mandatory,
    question: { code: questionCode },
  } = fieldData

  console.log(fieldData)

  const classes = useStyles()

  const handleChange = ({ target: { value } }) =>
    length(value) <= 2 && fieldType === 'mobile'
      ? setValue('4')
      : test(/^[0-9]+$/, value) || value === ''
        ? setValue(value)
        : null

  useEffect(
    () => {
      setErrors(errors => ({ ...errors, [questionCode]: false }))

      if (pristine) setPristine(false)
    },
    [value],
  )

  return (
    <TextField
      error={errors[questionCode] && !pristine}
      label={label}
      value={value}
      onChange={handleChange}
      variant="outlined"
      onBlur={() => handleUpdate(value)}
      className={classes.inputField}
      helperText={'No spaces or hyphens'}
      fullWidth
      InputProps={{
        startAdornment: (
          <Typography variant="overline" className={classes.inputAdornment}>{`+61`}</Typography>
        ),
      }}
    />
  )
}

export default PhoneNumberInput
