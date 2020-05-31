import React from 'react';
import { map, path, pick, values } from 'ramda';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const DropdownSelect = ({ label, validationList, baseEntities }) => {
  const optionsGrpName = validationList[0].selectionBaseEntityGroupList[0];
  const optionsLinkList = path( [optionsGrpName, 'links'], baseEntities );
  const targetCodes = map( path( ['link', 'targetCode'] ), optionsLinkList );
  const options = values( pick( values( targetCodes ), baseEntities ));

  return (
    <FormControl variant="outlined">
      <InputLabel>
        {label}
      </InputLabel>
      <Select
        value={options[0].code}
        label={label}
      >
        {map(({ code, name }) => (
          <MenuItem value={code}>
            {name}
          </MenuItem>
        ), options )}
      </Select>
    </FormControl>
  );
};

export default DropdownSelect;
