import React from 'react'
import { CircularProgress, Paper, Container } from '@material-ui/core'
import { Form } from '../index'

import useStyles from './styles'

const DialogForm = ({
  form,
  asks,
  setViewing,
  setLoading,
  attributes,
  baseEntities,
  googleApiKey,
}) => {
  const classes = useStyles()

  return (
    <Container className={classes.dialogRoot}>
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
    </Container>
  )
}

export default DialogForm
