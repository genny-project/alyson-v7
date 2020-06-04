import React, { useState } from 'react';
import { compose, prop, path, toUpper, map } from 'ramda';

import { Grid, Typography, Avatar } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import useStyles from './styles';
import { ColumnItems, RowItems } from '../../layouts';

const Details = ({ attributes, targetCode }) => {
  const detailView = prop( targetCode, attributes );

  const print = prop => path( [`PRI_${toUpper( prop )}`, 'value'], detailView ) || '';

  const getProps =  prop  => path( [`PRI_${toUpper( prop )}`], detailView );

  const [rating, setRating] = useState( 0 );
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      spacing={4}
      className={classes.detailsContainer}
    >
      <ColumnItems>
        {[print( 'name' ),  print( 'address_full' )]}
      </ColumnItems>

      <Grid item>
        <Typography variant="h5">
          {print( 'name' )}
        </Typography>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Grid item>
            <Avatar
              alt={print( 'name' )}
              src={print( 'image_url' )}
            />
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
            >
              <ColumnItems>
                {[print( 'address_full' ),  `${print( 'email' )}`]}
              </ColumnItems>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <RowItems>
        {[getProps( 'mobile' ), getProps( 'email' ), getProps( 'address_full' ), getProps( 'gender' ), getProps( 'is_agent' ), getProps( 'is_admin' )]}
      </RowItems>
      <Grid item>
        <Grid
          container
          direction="row"
        >
          <Typography className={classes.label}>
            {'Mobile'}
          </Typography>
          <Typography>
            {print( 'mobile' )}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
        >
          <Typography className={classes.label}>
            {'Industry'}
          </Typography>
          <Typography>
            {print( 'industry' )}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
        >
          <Typography className={classes.label}>
            {'Education Provider'}
          </Typography>
          <Typography>
            {print( 'education_provider' )}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
        >
          <Typography className={classes.label}>
            {'Current Course'}
          </Typography>
          <Typography>
            {print( 'current_course' )}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
        >
          <Typography className={classes.label}>
            {'Specialisation'}
          </Typography>
          <Typography>
            {print( 'specialisation' )}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
        >
          <Typography className={classes.label}>
            {'Rating'}
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={( event, newValue ) => setRating( newValue )}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
        >
          <Typography className={classes.label}>
            {'Transport Options'}
          </Typography>
          <Typography>
            {print( 'transport_options' )}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
        >
          <Typography className={classes.label}>
            {'Region'}
          </Typography>
          <Typography>
            {print( 'region' )}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
        >
          <Typography className={classes.label}>
            {'Next Scheduled Interview'}
          </Typography>
          <Typography>
            {print( 'interview' )}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Details;
