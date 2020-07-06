import React, { useState, useEffect } from 'react'
import { TextField, Typography } from '@material-ui/core'

import useStyles from './styles'

const PhoneNumberInput = ({ fieldType, label, fieldData, onUpdate, errors, initialValue }) => {
  const [value, setValue] = useState(initialValue || fieldType === 'mobile' ? '04' : '')

  const {
    question: { code: questionCode },
  } = fieldData

  const classes = useStyles()

  const handleChange = ({ target: { value } }) => setValue(value)

  return (
    <TextField
      error={errors[questionCode]}
      label={label}
      value={value}
      onChange={handleChange}
      variant="outlined"
      onBlur={() => onUpdate({ value })}
      className={classes.inputField}
      helperText={'No spaces or hyphens'}
      fullWidth
      test-id={questionCode}
    />
  )
}

export default PhoneNumberInput
