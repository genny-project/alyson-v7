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
  return (
    <Paper style={{ width: '60rem', height: '80rem' }}>
      {form ? (
        <Form
          formView={form}
          asks={asks}
          baseEntities={baseEntities}
          attributes={attributes}
          googleApiKey={googleApiKey}
          setViewing={setViewing}
          setLoading={setLoading}
        />
      ) : (
        <CircularProgress />
      )}
    </Paper>
  )
}

export default DialogForm
