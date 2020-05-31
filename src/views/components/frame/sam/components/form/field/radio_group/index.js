import React from 'react';
import { map, path, values, pick } from 'ramda';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';

const BuiltRadioGroup = ({ fieldData, label, validationList, baseEntities, dataType, links }) => {
  const optionsGrpName = validationList[0].selectionBaseEntityGroupList[0];
  const optionsLinkList = path( [optionsGrpName, 'links'], baseEntities );
  const targetCodes = map( path( ['link', 'targetCode'] ), optionsLinkList );
  const options = values( pick( values( targetCodes ), baseEntities ));

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        {label}
      </FormLabel>
      <RadioGroup
        row
        aria-label={label}
        name={label}
        value={null}
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
