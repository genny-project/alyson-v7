import React from 'react';
import { connect } from 'react-redux';

import { not, path } from 'ramda';
import { Grid, LinearProgress, Typography } from '@material-ui/core';

import { storeQuery, setTitle } from '../../../utils';
import getAppIsLoaded from './sam/helpers/get-app-is-loaded';

import Sam from './sam';

import useStyles from './styles';

const Frame = props => {
  const { rootCode, frames, asks, attributes } = props;

  const rootFrame = frames[rootCode];

  const projectAttributes = storeQuery.getProjectAttributes();
  const projectName = path( ['PRI_NAME', 'value'], projectAttributes || {});

  setTitle( projectName );

  const classes = useStyles();

  if ( not( getAppIsLoaded({ attributes, asks, rootFrame }))) {
    return (
      <div className={classes.rootLoadingContainer}>
        <LinearProgress />
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.loadingGrid}
        >
          <Grid item>
            <Typography variant="overline">
              {rootFrame ? 'Finishing up...' : 'Loading...'}
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }

  return <Sam {...props} />;
};

export { Frame };

const mapStateToProps = state => ({
  baseEntities: state.vertx.baseEntities.data,
  asks: state.vertx.asks,
  themes: state.vertx.layouts.themes,
  frames: state.vertx.layouts.frames,
  vertx: state.vertx.layouts,
  attributes: state.vertx.baseEntities.attributes,
});

export default connect( mapStateToProps )( Frame );
