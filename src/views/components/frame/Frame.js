import React from 'react';
import { connect } from 'react-redux';

import { path } from 'ramda';
import { Container, CircularProgress, Typography } from '@material-ui/core';

import { storeQuery, setTitle } from '../../../utils';

import Sam from './sam';

import useStyles from './styles';

const Frame = props => {
  const { rootCode, frames } = props;

  const rootFrame = frames[rootCode];

  const projectAttributes = storeQuery.getProjectAttributes();
  const projectName = path( ['PRI_NAME', 'value'], projectAttributes );

  const classes = useStyles();

  if ( !rootFrame ) {
    setTitle( projectName );

    return (
      <div className={classes.rootLoadingContainer}>
        <Container>
          <CircularProgress />
        </Container>
        <Container>
          <Typography variant="overline">
            {'Loading...'}
          </Typography>
        </Container>
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
});

export default connect( mapStateToProps )( Frame );
