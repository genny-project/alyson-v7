import React from 'react';
import { path, toLower, includes } from 'ramda';

import onUpdate from './actions/on-update';

import RadioGroup from './radio_group';
import PhoneNumberInput from './phone_number';
import DropdownSelect from './dropdown';
import SubmitButton from './submit_button';
import AddressSelect from './address_select';
import TextInput from './text_input';

const Field = ({ fieldData, baseEntities, links, onSubmit }) => {
  const label = path( ['name'], fieldData );
  const dataType = path( ['question', 'attribute', 'dataType'], fieldData );
  const fieldType = toLower( path( ['typeName'], dataType ));
  const validationList = path( ['validationList'], dataType );

  console.log( fieldType );

  return fieldType === 'text' || fieldType === 'email' ? (
    <TextInput
      fieldData={fieldData}
      label={label}
      variant="outlined"
      fullWidth
      onUpdate={onUpdate}
    />
  ) : fieldType === 'radio' ? (
    <RadioGroup
      fieldData={fieldData}
      label={label}
      dataType={dataType}
      validationList={validationList}
      baseEntities={baseEntities}
      links={links}
      onUpdate={onUpdate}
    />
  ) : fieldType === 'mobile' || fieldType === 'landline' ? (
    <PhoneNumberInput
      fieldData={fieldData}
      label={label}
      onUpdate={onUpdate}
      fieldType={fieldType}
    />
  ) : fieldType === 'dropdown' || fieldType === 'dropdownmultiple' ? (
    <DropdownSelect
      fieldData={fieldData}
      baseEntities={baseEntities}
      validationList={validationList}
      label={label}
      multiple={includes( 'multiple', fieldType )}
      onUpdate={onUpdate}
    />
  ) : fieldType === 'buttonevent' ? (
    <SubmitButton
      fieldData={fieldData}
      label={label}
      onSubmit={onSubmit}
    />
  ) : fieldType === 'address' ? (
    <AddressSelect onUpdate={onUpdate} />
  ) : null;
};

export default Field;
