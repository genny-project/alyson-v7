import React, { useState } from 'react'

import DateFnsUtils from '@date-io/date-fns'
import { format } from 'date-fns'

import { MuiPickersUtilsProvider, DatePicker, TimePicker } from '@material-ui/pickers'

const DateTimePicker = ({ onUpdate, label, questionCode, initialValue }) => {
  const [selectedDate, setSelectedDate] = useState(initialValue || null)

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        variant="inline"
        openTo="year"
        fullWidth
        disableToolbar
        autoOk
        onAccept={() => onUpdate({ value: format(new Date(selectedDate), 'yyyy-MM-dd') })}
        inputVariant="outlined"
        format="dd/MM/yyyy"
        id="date-picker-inline"
        label={label}
        value={selectedDate}
        onChange={setSelectedDate}
        test-id={questionCode}
        views={['year', 'month', 'date']}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DateTimePicker
