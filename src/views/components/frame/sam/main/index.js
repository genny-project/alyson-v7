import React from 'react';

import { prop } from 'ramda';
import { Paper, Grid, Typography } from '@material-ui/core';

import { Form, Table, Details, Dashboard, Unity, Bucket } from '../views';
import getView from './helpers/get-view';
import useStyles from './styles';

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
}) => {
  const classes = useStyles();

  const view = getView({ viewing, asks, frames });

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
          {view === 'DASHBOARD' ? (
            <Dashboard frames={frames} asks={asks} user={user} attributes={attributes} />
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
            <Bucket attributes={attributes} baseEntities={baseEntities} asks={asks} />
          ) : (
            <Table
              frames={frames}
              attributes={attributes}
              baseEntities={baseEntities}
              asks={asks}
              setViewing={setViewing}
            />
          )}
        </Paper>
      )}
    </div>
  );
};

export default Main;
