import React, { useState, useEffect } from 'react'
import { map } from 'ramda'
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'

const Dropdown = ({ label, options, onChange, initialValue }) => {
  const [selection, setSelection] = useState(initialValue)

  useEffect(
    () => {
      if (selection !== initialValue) onChange(selection)
    },
    [selection],
  )

  const handleChange = event => setSelection(event.target.value)
  return (
    <FormControl variant="outlined" style={{ minWidth: '15rem' }} color="primary">
      <InputLabel>{label}</InputLabel>
      <Select value={selection} onChange={handleChange} label={label}>
        {map(({ label, value }) => (
          <MenuItem key={'select' + value} value={value}>
            {label}
          </MenuItem>
        ))(options)}
      </Select>
    </FormControl>
  )
}
export default Dropdown
