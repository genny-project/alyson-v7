import React, { useState, useEffect } from 'react';
import { length, test } from 'ramda';
import { TextField } from '@material-ui/core';

import makeHandleUpdate from '../../helpers/make-handle-update';
import getValidationList from '../../helpers/get-validation-list';

import useStyles from './styles';

const PhoneNumberInput = ({ fieldType, label, fieldData, onUpdate, errors, setErrors }) => {
  const [value, setValue] = useState(fieldType === 'mobile' ? '04' : '0');

  const [pristine, setPristine] = useState(true);
  const handleUpdate = makeHandleUpdate(onUpdate)(fieldData, setErrors);
  const validationList = getValidationList(fieldData);

  const {
    mandatory,
    question: { code: questionCode },
  } = fieldData;

  const classes = useStyles();

  const handleChange = ({ target: { value } }) =>
    length(value) <= 2 && fieldType === 'mobile'
      ? setValue('04')
      : length(value) <= 10 && test(/^[0-9]+$/, value)
        ? setValue(value)
        : null;

  useEffect(
    () => {
      setErrors(errors => ({ ...errors, [questionCode]: false }));

      if (pristine) setPristine(false);
    },
    [value]
  );

  return (
    <TextField
      error={errors[questionCode] && !pristine}
      label={label}
      value={value}
      onChange={handleChange}
      variant="outlined"
      onBlur={() => handleUpdate(value)}
      className={classes.inputField}
    />
  );
};

export default PhoneNumberInput;
