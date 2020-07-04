import React, { useState, useEffect } from 'react'
import {
  map,
  path,
  pick,
  prop,
  sortBy,
  values,
  head,
  compose,
  propOr,
  any,
  equals,
  filter,
} from 'ramda'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import getValidationList from '../../helpers/get-validation-list'

import useStyles from './styles'

const DropdownSelect = ({
  fieldData,
  initialValue,
  label,
  baseEntities,
  multiple,
  onUpdate,
  errors,
}) => {
  const optionsGrpName = compose(
    head,
    prop('selectionBaseEntityGroupList'),
    head,
    getValidationList,
  )(fieldData)

  const optionsLinkList = path([optionsGrpName, 'links'], baseEntities) || []
  const targetCodes =
    map(path(['link', 'targetCode']), sortBy(prop('weight'))(optionsLinkList)) || []

  const options = map(pick(['name', 'code']), values(pick(values(targetCodes), baseEntities))) || []

  const {
    mandatory,
    question: { code: questionCode },
  } = fieldData
  const prepareData = map(prop('code'))
  const [value, setValue] = useState(initialValue || multiple ? [] : null)
  const classes = useStyles()

  const handleChange = (event, newValue) => {
    setValue(newValue)
    onUpdate({ value: prepareData(multiple ? newValue : [newValue]) })
  }

  useEffect(
    () => {
      if (initialValue === ' ') setValue(multiple ? [] : null)
    },
    [initialValue],
  )

  return (
    <Autocomplete
      className={classes.select}
      label={label}
      multiple={multiple}
      defaultValue={filter(({ code }) => any(equals(code))(initialValue), options)}
      onChange={handleChange}
      required={mandatory}
      options={options}
      getOptionLabel={propOr('', 'name')}
      getOptionSelected={(option, value) => option.code === value.code}
      renderInput={params => <TextField {...params} label={label} variant="outlined" />}
      test-id={questionCode}
    />
  )
}

export default DropdownSelect
