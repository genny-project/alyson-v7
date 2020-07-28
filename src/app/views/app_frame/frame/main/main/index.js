import React, { useState } from 'react'

import { prop } from 'ramda'
import { Paper, Grid, Typography } from '@material-ui/core'
import { Form, Table, Details, Dashboard, Unity, Bucket, DialogForm, MapList } from '../views'
import getView from './helpers/get-view'
import getUserDetails from './helpers/get-user-details.js'
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
  drawerItems,
  dialogContent,
  setDialogContent,
  dashboard,
  downloadLink,
  currentAsk,
}) => {
  const classes = useStyles()

  const view = getView({ viewing, asks, frames })
  const application = getApplication(attributes)

  const [current, setCurrent] = useState({})

  if (loading || !view || view === 'LOADING') {
    return (
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
    )
  }

  if (view === 'UNITY') {
    return (
      <Unity
        frames={frames}
        attributes={attributes}
        baseEntities={baseEntities}
        asks={asks}
        setViewing={setViewing}
        viewing={viewing}
        setLoading={setLoading}
        googleApiKey={googleApiKey}
      />
    )
  }

  return (
    <div className={classes.root}>
      <DialogForm
        currentAsk={currentAsk}
        asks={asks}
        baseEntities={baseEntities}
        attributes={attributes}
        googleApiKey={googleApiKey}
        setViewing={setViewing}
        setLoading={setLoading}
        viewing={viewing}
        loading={loading}
      />
      {view === 'DASHBOARD' ? (
        <Dashboard
          user={user}
          projectName={projectName}
          setViewing={setViewing}
          dashboard={dashboard}
          asks={asks}
          attributes={attributes}
        />
      ) : view === 'MAP_LIST' ? (
        <MapList
          setViewing={setViewing}
          currentSearch={currentSearch}
          viewing={viewing}
          downloadLink={downloadLink}
          apiKey={googleApiKey}
          attributes={attributes}
        />
      ) : (
        <Paper className={classes.mainPaper}>
          {view === 'AGREEMENT' || view === 'FORM' ? (
            <Form
              currentAsk={currentAsk}
              asks={asks}
              baseEntities={baseEntities}
              attributes={attributes}
              googleApiKey={googleApiKey}
              setViewing={setViewing}
              setLoading={setLoading}
              viewing={viewing}
              user={getUserDetails(user)}
            />
          ) : view === 'DETAIL' ? (
            <Details
              attributes={attributes}
              targetCode={prop('targetCode', viewing)}
              setViewing={setViewing}
              setLoading={setLoading}
              viewing={viewing}
              googleApiKey={googleApiKey}
            />
          ) : view === 'BUCKET' || view === 'PROCESS' ? (
            <Bucket
              currentSearch={currentSearch}
              setViewing={setViewing}
              current={current}
              setCurrent={setCurrent}
            />
          ) : (
            <Table
              setViewing={setViewing}
              currentSearch={currentSearch}
              viewing={viewing}
              downloadLink={downloadLink}
            />
          )}
        </Paper>
      )}
    </div>
  )
}

export default Main
