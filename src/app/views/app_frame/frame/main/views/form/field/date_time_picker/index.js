import React, { useState, useEffect } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';

import { MuiPickersUtilsProvider, DatePicker, TimePicker } from '@material-ui/pickers';

import makeHandleUpdate from '../../helpers/make-handle-update';

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
  questionCode,
  ...rest
}) => {
  const [selectedDate, setSelectedDate] = useState( null );

  const handleUpdate = date =>
    makeHandleUpdate( onUpdate )( fieldData, setErrors )( format( date, 'yyyy-MM-dd' ));

  const handleUpdateTime = time =>
    makeHandleUpdate( onUpdate )( fieldData, setErrors )( format( time, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx' ));

  const handleDateChange = date => {
    setSelectedDate( date );
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {inputType === 'date' ? (
        <DatePicker
          disableToolbar
          autoOk
          onAccept={handleUpdate}
          variant="inline"
          inputVariant="outlined"
          format="dd/MM/yyyy"
          id="date-picker-inline"
          label={label}
          value={selectedDate}
          onChange={handleDateChange}
          test-id={questionCode}
        />
      ) : (
        <TimePicker
          autoOk
          onAccept={handleUpdateTime}
          id="time-picker"
          inputVariant="outlined"
          label={label}
          value={selectedDate}
          onChange={handleDateChange}
          test-id={questionCode}
        />
      )}
    </MuiPickersUtilsProvider>
  );
};

export default DateTimePicker;
