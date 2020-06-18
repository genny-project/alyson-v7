import React from 'react';

import { prop } from 'ramda';
import { Paper, Grid, Typography, Fab, Tooltip } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIosRounded';
import { Form, Table, Details, Dashboard, Unity, Bucket } from '../views';
import { Notes } from '../components'
import getView from './helpers/get-view';
import useStyles from './styles';
import SidePanelContext from '../contexts/sidePanel'

const Main = ({
  attributes,
  viewing,
  setViewing,
  baseEntities,
  asks,
  links,
  frames,
  user,
  googleApiKey,
  loading,
  setLoading,
  projectName,
}) => {
  const classes = useStyles();

  const view = getView({ viewing, asks, frames });

  const { toggleSidePanel } = React.useContext( SidePanelContext )

  return (
    <div className={classes.root}>
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
          <Notes
            setViewing={setViewing}
          />
          {/* {view === 'DASHBOARD' ? (
            <Dashboard
              frames={frames}
              asks={asks}
              user={user}
              attributes={attributes}
              projectName={projectName}
            />
          ) : view.attributeCode === 'QQQ_QUESTION_GROUP' ? (
            <Form
              formView={view}
              asks={asks}
              baseEntities={baseEntities}
              attributes={attributes}
              links={links}
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
              links={links}
              googleApiKey={googleApiKey}
              setViewing={setViewing}
              setLoading={setLoading}
            />
          ) : view === 'DETAIL' ? (
            <Details
              attributes={attributes}
              targetCode={prop( 'targetCode', viewing )}
            />
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
              attributes={attributes}
              baseEntities={baseEntities}
              asks={asks}
              setViewing={setViewing}
            />
          ) : (
            <Table
              frames={frames}
              attributes={attributes}
              baseEntities={baseEntities}
              asks={asks}
              setViewing={setViewing}
            />
          )}*/}
          {
            <Tooltip
              title="Show side panel"
              placement="top-start"
            >
              <Fab
                color="primary"
                onClick={toggleSidePanel}
                className={classes.fab}
              >
                <ArrowBackIosIcon color="inherit" />
              </Fab>
            </Tooltip>
           }
        </Paper>
      )}
    </div>
  );
};

export default Main;
