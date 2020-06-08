import React from 'react';

import { prop } from 'ramda';
import { Paper, Grid, Typography } from '@material-ui/core';

import { Form, Table, Details, Dashboard } from '../views';
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
            <Typography variant="overline">{'Preparing...'}</Typography>
          </Grid>
        </Grid>
      ) : (
        <Paper className={classes.mainPaper}>
          {view === 'DASHBOARD' ? (
            <Dashboard />
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
