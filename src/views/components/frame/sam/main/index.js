import React from 'react';

import { prop, not, isEmpty, replace } from 'ramda';
import { Paper, CircularProgress } from '@material-ui/core';

import { Form, Table } from '../components';

import useStyles from './styles';

const Main = ({ attributes, viewing, baseEntities, asks, links, frames, user, googleApiKey }) => {
  const classes = useStyles();

  const view = not( isEmpty( viewing ))
    ? asks[replace( 'MENU', 'GRP', prop( 'code', viewing ))] || 'TABLE'
    : 'TABLE';

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
            googleApiKey={googleApiKey}
          />
        ) : (
          <Table
            frames={frames}
            attributes={attributes}
            baseEntities={baseEntities}
            asks={asks}
          />
        )}
      </Paper>
    </div>
  );
};

export default Main;
