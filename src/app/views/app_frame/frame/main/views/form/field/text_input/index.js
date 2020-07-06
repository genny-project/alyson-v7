import React, { useState } from 'react'
import { TextField } from '@material-ui/core'

const TextInput = ({ errors, onUpdate, fieldData, label, initialValue, touched }) => {
  const [value, setValue] = useState(initialValue || '')

  const {
    question: { code: questionCode },
    mandatory,
  } = fieldData

  const handleChange = ({ target: { value } }) => setValue(value)

  return (
    <TextField
      fullWidth
      variant="outlined"
      error={touched && errors[questionCode]}
      value={value}
      onChange={handleChange}
      onBlur={() => onUpdate({ value })}
      label={label}
      required={mandatory}
      type={'text'}
      test-id={questionCode}
    />
  )
}

export default TextInput
