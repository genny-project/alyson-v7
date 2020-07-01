import React from 'react'
import { prop, includes } from 'ramda'
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
  viewing,
}) => {
  const classes = useStyles()

  const handleClose = () =>
    setViewing(
      prop('dialog', viewing) === 'APPLICATION'
        ? { ...viewing, dialog: false }
        : { code: 'QUE_TREE_ITEM_INTERNS_GRP', parentCode: 'QUE_TREE_ITEM_CONTACTS_GRP' },
    )

  return (
    <Dialog
      open={prop('dialog', viewing) === 'APPLICATION' || includes('APPLY', prop('code', viewing))}
      onClose={handleClose}
      fullWidth
    >
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
            viewing={viewing}
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
