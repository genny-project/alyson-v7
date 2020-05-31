import React from 'react';

import { path, compose, prop, find, propEq, last, head } from 'ramda';
import { Paper, CircularProgress } from '@material-ui/core';

import { Form } from '../components';

import useStyles from './styles';

const Main = ({ viewing, baseEntities, asks, links, frames, user }) => {
  const classes = useStyles();

  const view =
    viewing.length === 1
      ? path( viewing, asks )
      : compose(
        find( propEq( 'questionCode', last( viewing ))),
        prop( 'childAsks' ),
        prop( head( viewing ))
      )( asks );

  if ( !view )
    return (
      <div>
        <CircularProgress />
      </div>
    );

  return (
    <div className={classes.root}>
      <Paper className={classes.mainPaper}>
        {view.attributeCode === 'QQQ_QUESTION_GROUP' ? (
          <Form
            formView={view}
            asks={asks}
            baseEntities={baseEntities}
            links={links}
          />
        ) : (
          <div>
            {view.name}
          </div>
        )}
      </Paper>
    </div>
  );
};

export default Main;
