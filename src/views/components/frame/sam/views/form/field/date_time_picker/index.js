import React, { useState } from 'react';

import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';

const DateTimePicker = ({
  errors,
  setErrors,
  onUpdate,
  fieldData,
  label,
  initialValue,
  pristine,
  setPristine,
  fieldType,
  inputType = 'date',
  ...rest
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {inputType === 'date' ? (
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          inputVariant="outlined"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label={label}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      ) : (
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          inputVariant="outlined"
          label={label}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      )}
    </MuiPickersUtilsProvider>
  );
};

export default DateTimePicker;
