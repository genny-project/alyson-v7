import React, { useState } from 'react'

import DateFnsUtils from '@date-io/date-fns'
import { format } from 'date-fns'

import { MuiPickersUtilsProvider, DatePicker, TimePicker } from '@material-ui/pickers'

const DateTimePicker = ({ onUpdate, label, questionCode, initialValue }) => {
  const [selectedDate, setSelectedDate] = useState(initialValue || null)

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        disableToolbar
        autoOk
        onAccept={() => onUpdate({ value: format(new Date(selectedDate), 'yyyy-MM-dd') })}
        variant="inline"
        inputVariant="outlined"
        format="dd/MM/yyyy"
        id="date-picker-inline"
        label={label}
        value={selectedDate}
        onChange={setSelectedDate}
        test-id={questionCode}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DateTimePicker
