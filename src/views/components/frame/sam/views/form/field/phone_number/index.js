import React, { useState } from 'react';

import MaskedInput from 'react-text-mask';
import { TextField } from '@material-ui/core';
import useStyles from './styles';

const PhoneNumberInput = ({ fieldType, label, fieldData, onUpdate }) => {
  const [value, setValue] = useState( fieldType === 'mobile' ? '(61)   -   -   ' : '0 -    -    ' );

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

  const PhoneNumberMask = ({ inputRef, ...rest }) =>
    fieldType === 'mobile' ? (
      <MaskedInput
        {...rest}
        ref={ref => inputRef( ref ? ref.inputElement : null )}
        mask={[
          '(',
          '6',
          '1',
          ')',
          /[4-5]/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          /\d/,
        ]}
        placeholderChar={'\u2000'}
        showMask
      />
    ) : (
      <MaskedInput
        {...rest}
        ref={ref => inputRef( ref ? ref.inputElement : null )}
        mask={['0', /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );

  const classes = useStyles();

  return (
    <TextField
      label={label}
      value={value}
      onChange={event => setValue( event.target.value )}
      InputProps={{
        inputComponent: PhoneNumberMask,
      }}
      variant="outlined"
      onBlur={handleUpdate}
      className={classes.inputField}
    />
  );
};

export default PhoneNumberInput;
