import React from 'react'
import { CircularProgress, Dialog, DialogContent, Container } from '@material-ui/core'
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
  view,
}) => {
  const classes = useStyles()

  const handleClose = () =>
    setViewing({ code: 'QUE_TREE_ITEM_INTERNS_GRP', parentCode: 'QUE_TREE_ITEM_CONTACTS_GRP' })

  return (
    <Dialog open={view === 'APPLICATION'} onClose={handleClose} fullWidth>
      <DialogContent className={classes.dialogContent}>
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
          <Container className={classes.fullWidth}>
            <CircularProgress />
          </Container>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DialogForm
