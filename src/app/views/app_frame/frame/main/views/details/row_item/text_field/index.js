import React from 'react'

import { TextField } from '@material-ui/core'

const TextFieldDetails = ({ onUpdate, code, value, setValue, weight }) => {
  return (
    <TextField
      value={value}
      onChange={event => setValue(event.target.value)}
      onBlur={() => onUpdate({ value, code, weight })}
      fullWidth
      variant="outlined"
    />
  )
}

export default TextFieldDetails
