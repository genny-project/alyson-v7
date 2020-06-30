import React, { useState, useEffect, useRef } from 'react'
import { map, path, pick, prop, sortBy, values, head, compose, equals } from 'ramda'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import makeHandleUpdate from '../../helpers/make-handle-update'

import useStyles from './styles'

const DropdownSelect = ({
  fieldData,
  initialValue,
  label,
  validationList,
  baseEntities,
  multiple,
  onUpdate,
  errors,
}) => {
  const optionsGrpName = compose(
    head,
    prop('selectionBaseEntityGroupList'),
    head,
  )(validationList)

  const optionsLinkList = path([optionsGrpName, 'links'], baseEntities) || []
  const targetCodes =
    map(path(['link', 'targetCode']), sortBy(prop('weight'))(optionsLinkList)) || []

  const options = map(pick(['name', 'code']), values(pick(values(targetCodes), baseEntities))) || []

  const handleUpdate = makeHandleUpdate(onUpdate)(fieldData)

  const {
    mandatory,
    question: { code: questionCode },
  } = fieldData
  const prepareData = map(prop('code'))
  const [value, setValue] = useState(initialValue || multiple ? [] : null)
  const [pristine, setPristine] = useState(true)
  const classes = useStyles()

  const handleChange = (event, newValue) => {
    setValue(newValue)
    handleUpdate(prepareData(multiple ? newValue : [newValue]))
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
      error={errors[questionCode] && !pristine}
      label={label}
      multiple={multiple}
      value={value}
      onChange={handleChange}
      required={mandatory}
      options={options}
      getOptionLabel={prop('name')}
      getOptionSelected={(option, value) => option.code === value.code}
      renderInput={params => <TextField {...params} label={label} variant="outlined"/>}
      test-id={questionCode}
    />
  )
}

export default DropdownSelect
