import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

const TextInput = ({ onUpdate, fieldData, label, initialValue, ...rest }) => {
  const [value, setValue] = useState( initialValue || '' );

  const {
    attributeCode,
    question: { code: questionCode },
    sourceCode,
    targetCode,
    weight,
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

  return (
    <TextField
      {...rest}
      value={value}
      onChange={event => setValue( event.target.value )}
      onBlur={handleUpdate}
      label={label}
    />
  );
};

export default TextInput;
