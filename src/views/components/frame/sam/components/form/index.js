import React from 'react';
import { path, map, prop } from 'ramda';
import { Grid, Typography } from '@material-ui/core';

import onSubmit from './field/actions/on-submit';

import Field from './field';

import useStyles from './styles';

const Form = ({ formView, asks, baseEntities, links }) => {
  const title = path( ['question', 'name'], formView );
  const formFields = path( ['childAsks'], formView );

  console.log( formView );

  const parentCode = prop( 'questionCode', formView );
  const rootCode = prop( 'questionCode', formView );

  const classes = useStyles();

  console.log( formFields );

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
      className={classes.formRoot}
      spacing={2}
    >
      <Grid item>
        <Typography
          color="textSecondary"
          variant="h5"
        >
          {title}
        </Typography>
      </Grid>
      {map( field => (
        <Grid
          item
          key={`gridItem${field.questionCode}`}
        >
          <Field
            key={field.questionCode}
            fieldData={field}
            baseEntities={baseEntities}
            links={links}
            onSubmit={onSubmit({ parentCode, rootCode })}
          />
        </Grid>
      ))( formFields )}
    </Grid>
  );
};

export default Form;
