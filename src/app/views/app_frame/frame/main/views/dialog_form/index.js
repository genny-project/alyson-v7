import React from 'react'
import { CircularProgress, Dialog, DialogContent, Container } from '@material-ui/core'
import { Form } from '../index'

import useStyles from './styles'

const DialogForm = ({
  form,
  asks,
  loading,
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
        {form && !loading ? (
          <Form
            formView={form}
            asks={asks}
            baseEntities={baseEntities}
            attributes={attributes}
            googleApiKey={googleApiKey}
            setViewing={setViewing}
            setLoading={setLoading}
            redirect={() =>
              setViewing({
                code: 'QUE_TAB_BUCKET_VIEW',
                targetCode: 'PER_USER1',
              })
            }
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
