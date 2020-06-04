import React, { useState } from 'react';
import { length, test } from 'ramda';
import { TextField } from '@material-ui/core';

import makeHandleUpdate from '../../helpers/make-handle-update';
import getValidationList from '../../helpers/get-validation-list';

import useStyles from './styles';

const PhoneNumberInput = ({ fieldType, label, fieldData, onUpdate }) => {
  const [value, setValue] = useState( fieldType === 'mobile' ? '04' : '' );
  const handleUpdate = makeHandleUpdate( onUpdate )( fieldData );
  const validationList = getValidationList( fieldData );

  const classes = useStyles();

  const handleChange = ({ target: { value } }) =>
    length( value ) <= 2 && fieldType === 'mobile'
      ? setValue( '04' )
      : length( value ) <= 10 && test( /^[0-9]+$/, value )
        ? setValue( value )
        : null;

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      variant="outlined"
      onBlur={() => handleUpdate( value )}
      className={classes.inputField}
    />
  );
};

export default PhoneNumberInput;
