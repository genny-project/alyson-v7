import React, { useState } from 'react';

import { TextField } from '@material-ui/core';

const makeTextField = ({
  ask: { disabled, hidden, mandatory, name },
  onBlur,
  onChangeValue,
  error,
  hint,
  placeholder,
  value,
  ...rest
}) => {
  return (
    <TextField
      disabled={disabled}
      required={mandatory}
      label={name}
      onBlur={onBlur}
      onChange={event => onChangeValue( event.target.value )}
      error={error}
      placeholder={placeholder}
      value={value}
      variant="outlined"
      style={{ marginTop: '1rem' }}
    />
  );
};

export default makeTextField;
