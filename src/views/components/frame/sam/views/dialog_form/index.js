import React from 'react'
import { CircularProgress, Paper } from '@material-ui/core'
import { Form } from '../index'

const DialogForm = ({
  form,
  asks,
  setViewing,
  setLoading,
  attributes,
  baseEntities,
  googleApiKey,
}) => {
  console.log(form)
  return form ? (
    <Paper style={{ width: '40rem', height: '80rem' }}>
      <Form
        formView={form}
        asks={asks}
        baseEntities={baseEntities}
        attributes={attributes}
        googleApiKey={googleApiKey}
        setViewing={setViewing}
        setLoading={setLoading}
      />
    </Paper>
  ) : (
    <CircularProgress />
  )
}

export default DialogForm
