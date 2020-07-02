import React from 'react'
import { prop, includes } from 'ramda'
import { Row } from '../../components/layouts'
import { CircularProgress, Dialog, DialogContent } from '@material-ui/core'
import { Form } from '../index'

import useStyles from './styles'

const DialogForm = ({
  currentAsk,
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
      open={
        prop('dialog', viewing) === 'APPLICATION' || includes('APPLY', prop('code', viewing) || '')
      }
      onClose={handleClose}
      fullWidth
    >
      <DialogContent className={classes.dialogContent}>
        {!loading ? (
          <Form
            currentAsk={currentAsk}
            asks={asks}
            baseEntities={baseEntities}
            attributes={attributes}
            googleApiKey={googleApiKey}
            setViewing={setViewing}
            setLoading={setLoading}
            redirect={() =>
              setViewing({
                view: 'BUCKET',
                code: 'QUE_TAB_BUCKET_VIEW',
                targetCode: 'PER_USER1',
              })
            }
            viewing={viewing}
          />
        ) : (
          <Row className={classes.fullWidth}>
            <CircularProgress />
          </Row>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DialogForm
