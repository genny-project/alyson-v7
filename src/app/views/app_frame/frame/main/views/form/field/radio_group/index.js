import React, { useState } from 'react'
import { map, path, values, pick, compose, head, prop } from 'ramda'
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core'
import getValidationList from '../../helpers/get-validation-list'

const BuiltRadioGroup = ({
  onUpdate,
  initialValue,
  fieldData,
  label,
  baseEntities,
  questionCode,
}) => {
  const optionsGrpName = compose(
    head,
    prop('selectionBaseEntityGroupList'),
    head,
    getValidationList,
  )(fieldData)

  const optionsLinkList = path([optionsGrpName, 'links'], baseEntities)
  const targetCodes = map(path(['link', 'targetCode']), optionsLinkList)
  const options = values(pick(values(targetCodes), baseEntities))

  const [value, setValue] = useState(initialValue || '')

  const handleChange = ({ target: { value } }) => {
    setValue(value)
    onUpdate({ value })
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        row
        aria-label={label}
        name={label}
        value={value}
        onChange={handleChange}
        test-id={questionCode}
      >
        {map(({ code, name }) => (
          <FormControlLabel
            key={`radio${code}`}
            test-id={code}
            value={code}
            control={<Radio />}
            label={name}
          />
        ))(options)}
      </RadioGroup>
    </FormControl>
  )
}

export default BuiltRadioGroup
