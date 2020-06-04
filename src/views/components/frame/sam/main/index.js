import React from 'react';

import { prop, not, isEmpty, replace, contains, keys, length } from 'ramda';
import { Paper, CircularProgress, Grid, Typography } from '@material-ui/core';

import { Form, Table, Details } from '../views';

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
}) => {
  const classes = useStyles();

  const view = not( isEmpty( viewing ))
    ? length( keys( viewing )) === 1
      ? 'DETAIL'
      : contains( 'MENU', prop( 'code', viewing ))
        ? asks[replace( 'MENU', 'GRP', prop( 'code', viewing ))]
        : 'TABLE'
    : 'TABLE';

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
            <CircularProgress />
          </Grid>
          <Grid item>
            <Typography variant="overline">
              {'Preparing...'}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Paper className={classes.mainPaper}>
          {view.attributeCode === 'QQQ_QUESTION_GROUP' ? (
            <Form
              formView={view}
              asks={asks}
              baseEntities={baseEntities}
              links={links}
              googleApiKey={googleApiKey}
            />
          ) : view === 'DETAIL' ? (
            <Details
              attributes={attributes}
              targetCode={prop( 'targetCode', viewing )}
            />
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
