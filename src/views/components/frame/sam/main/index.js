import React from 'react';

import { prop, not, isEmpty, replace } from 'ramda';
import { Paper, CircularProgress } from '@material-ui/core';

import { Form } from '../components';

import useStyles from './styles';

const Main = ({ viewing, baseEntities, asks, links, frames, user }) => {
  const classes = useStyles();

  const view = not( isEmpty( viewing )) ? asks[replace( 'MENU', 'GRP', prop( 'code', viewing ))] : null;

  return (
    <div className={classes.root}>
      <Paper className={classes.mainPaper}>
        {!view ? (
          <CircularProgress />
        ) : view.attributeCode === 'QQQ_QUESTION_GROUP' ? (
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
