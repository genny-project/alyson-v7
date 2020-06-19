import React, { useState, useEffect } from 'react'

import { prop, isEmpty } from 'ramda'
import { Paper, Grid, Typography, DialogTitle, Dialog } from '@material-ui/core'

import { Form, Table, Details, Dashboard, Unity, Bucket, DialogForm } from '../views'
import getView from './helpers/get-view'
import getApplication from './helpers/get-application'
import useStyles from './styles'

const Main = ({
  attributes,
  viewing,
  setViewing,
  baseEntities,
  asks,
  frames,
  user,
  googleApiKey,
  loading,
  setLoading,
  projectName,
  currentSearch,
  dialogContent,
  setDialogContent,
}) => {
  const classes = useStyles()

  console.log(viewing)

  const view = getView({ viewing, asks, frames })
  const application = getApplication(attributes)

  const [current, setCurrent] = useState({})

  return (
    <div className={classes.root}>
      <Dialog open={view === 'APPLICATION'}>
        <DialogForm
          form={prop('QUE_ADD_APPLICATION_GRP', asks)}
          asks={asks}
          baseEntities={baseEntities}
          attributes={attributes}
          googleApiKey={googleApiKey}
          setViewing={setViewing}
          setLoading={setLoading}
        />
      </Dialog>
      {loading || !view ? (
        <Grid
          spacing={2}
          container
          direction="column"
          alignItems="center"
          justify="flex-start"
          className={classes.loadingContainer}
        >
          <Grid item>
            <Typography variant="overline">
              {typeof loading === 'string' ? loading : 'Preparing...'}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Paper className={classes.mainPaper}>
          {view === 'DASHBOARD' ? (
            <Dashboard
              frames={frames}
              asks={asks}
              user={user}
              attributes={attributes}
              projectName={projectName}
            />
          ) : view === 'AGREEMENT' || view.attributeCode === 'QQQ_QUESTION_GROUP' ? (
            <Form
              formView={
                view === 'AGREEMENT' ? prop('QUE_AGREEMENT_DOCUMENT_INTERN_FORM_GRP', asks) : view
              }
              asks={asks}
              baseEntities={baseEntities}
              attributes={attributes}
              googleApiKey={googleApiKey}
              setViewing={setViewing}
              setLoading={setLoading}
            />
          ) : view.attributeCode === 'QQQ_QUESTION_GROUP_BUTTON_CANCEL_SUBMIT' ? (
            <Form
              formView={view}
              asks={asks}
              baseEntities={baseEntities}
              attributes={attributes}
              googleApiKey={googleApiKey}
              setViewing={setViewing}
              setLoading={setLoading}
            />
          ) : view === 'DETAIL' ? (
            <Details attributes={attributes} targetCode={prop('targetCode', viewing)} />
          ) : view === 'UNITY' ? (
            <Unity
              frames={frames}
              attributes={attributes}
              baseEntities={baseEntities}
              asks={asks}
              setViewing={setViewing}
              viewing={viewing}
            />
          ) : view === 'BUCKET' ? (
            <Bucket
              currentSearch={currentSearch}
              setViewing={setViewing}
              current={current}
              setCurrent={setCurrent}
            />
          ) : (
            <Table setViewing={setViewing} currentSearch={currentSearch} />
          )}
        </Paper>
      )}
    </div>
  )
}

export default Main