import React, { useState } from 'react';

import MaskedInput from 'react-text-mask';
import { TextField } from '@material-ui/core';

const MobileNumberMask = ({ inputRef, ...rest }) => (
  <MaskedInput
    {...rest}
    ref={ref => inputRef( ref ? ref.inputElement : null )}
    mask={['(', '6', '1', ')', /[4-5]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
    placeholderChar={'\u2000'}
    showMask
  />
);

const MobileNumberInput = ({ label }) => {
  const [value, setValue] = useState( '(61)   -   -   ' );

  return (
    <TextField
      label={label}
      value={value}
      onChange={event => setValue( event.target.value )}
      InputProps={{
        inputComponent: MobileNumberMask,
      }}
      variant="outlined"
    />
  );
};

export default MobileNumberInput;
