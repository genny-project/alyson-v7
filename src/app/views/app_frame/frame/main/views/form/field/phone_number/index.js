import React, { useState, useEffect } from 'react'
import { TextField, Typography } from '@material-ui/core'

import makeHandleUpdate from '../../helpers/make-handle-update'

import useStyles from './styles'

const PhoneNumberInput = ({ fieldType, label, fieldData, onUpdate, errors, setErrors }) => {
  const [value, setValue] = useState(fieldType === 'mobile' ? '04' : '')

  const [pristine, setPristine] = useState(true)
  const handleUpdate = makeHandleUpdate(onUpdate)(fieldData, setErrors)

  const {
    question: { code: questionCode },
  } = fieldData

  const classes = useStyles()

  const handleChange = ({ target: { value } }) => setValue(value)

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
        startAdornment:
          fieldType === 'mobile' ? (
            <div />
          ) : (
            <Typography variant="overline" className={classes.inputAdornment}>{`+61`}</Typography>
          ),
      }}
    />
  )
}

export default PhoneNumberInput
