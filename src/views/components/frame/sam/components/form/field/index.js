import React from 'react';
import { path, toLower } from 'ramda';

import { TextField } from '@material-ui/core';

import RadioGroup from './radio_group';
import MobilNumberInput from './mobile_number';
import DropdownSelect from './dropdown';

const Field = ({ fieldData, baseEntities, links }) => {
  const label = path( ['name'], fieldData );
  const dataType = path( ['question', 'attribute', 'dataType'], fieldData );
  const fieldType = toLower( path( ['typeName'], dataType ));
  const validationList = path( ['validationList'], dataType );

  console.log( fieldType );

  return fieldType === 'text' || fieldType === 'email' ? (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
    />
  ) : fieldType === 'radio' ? (
    <RadioGroup
      fieldData={fieldData}
      label={label}
      dataType={dataType}
      validationList={validationList}
      baseEntities={baseEntities}
      links={links}
    />
  ) : fieldType === 'mobile' ? (
    <MobilNumberInput
      fieldData={fieldData}
      label={label}
    />
  ) : fieldType === 'dropdown' ? (
    <DropdownSelect
      fieldData={fieldData}
      baseEntities={baseEntities}
      validationList={validationList}
      label={label}
    />
  ) : null;
};

export default Field;
