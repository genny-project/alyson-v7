import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { prop } from 'ramda';

const TextInput = ({
  errors,
  setErrors,
  onUpdate,
  fieldData,
  label,
  initialValue,
  pristine,
  setPristine,
  ...rest
}) => {
  const [value, setValue] = useState( initialValue || '' );

  const {
    attributeCode,
    question: {
      code: questionCode,
      attribute: {
        dataType: { validationList },
      },
    },
    sourceCode,
    targetCode,
    weight,
    mandatory,
  } = fieldData;

  const handleUpdate = () =>
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

  const handleChange = ({ target: { value } }) => {
    setValue( value );
    if ( pristine ) setPristine( false );
    if ( mandatory && !value ) {
      setErrors( errors => ({ ...errors, [questionCode]: true }));
    } else if ( prop( questionCode, errors )) {
      setErrors( errors => ({ ...errors, [questionCode]: false }));
    }
  };

  return (
    <TextField
      {...rest}
      error={errors[questionCode] || false}
      value={value}
      onChange={handleChange}
      onBlur={handleUpdate}
      label={label}
      required={mandatory}
    />
  );
};

export default TextInput;
