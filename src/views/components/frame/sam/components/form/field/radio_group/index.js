import React, { useState } from 'react';
import { map, path, values, pick } from 'ramda';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';

const BuiltRadioGroup = ({
  onUpdate,
  initialValue,
  fieldData,
  label,
  validationList,
  baseEntities,
  dataType,
  links,
}) => {
  const optionsGrpName = validationList[0].selectionBaseEntityGroupList[0];
  const optionsLinkList = path( [optionsGrpName, 'links'], baseEntities );
  const targetCodes = map( path( ['link', 'targetCode'] ), optionsLinkList );
  const options = values( pick( values( targetCodes ), baseEntities ));

  const {
    attributeCode,
    question: { code: questionCode },
    sourceCode,
    targetCode,
    weight,
  } = fieldData;

  const handleUpdate = value =>
    onUpdate({
      ask: {
        attributeCode,
        questionCode,
        sourceCode,
        targetCode,
        weight,
      },
      value,
    });

  const [value, setValue] = useState( initialValue || '' );

  const handleChange = ({ target: { value } }) => {
    setValue( value );
    handleUpdate( [value] );
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        {label}
      </FormLabel>
      <RadioGroup
        row
        aria-label={label}
        name={label}
        value={value}
        onChange={handleChange}
      >
        {map(({ code, name }) => (
          <FormControlLabel
            value={code}
            control={<Radio />}
            label={name}
          />
        ))( options )}
      </RadioGroup>
    </FormControl>
  );
};

export default BuiltRadioGroup;
