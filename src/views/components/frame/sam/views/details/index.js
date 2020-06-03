import React, { useState } from 'react';
import { compose, prop, path, toUpper } from 'ramda';

import { Grid, Typography, Avatar } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import useStyles from './styles';

const Details = ({ attributes, targetCode }) => {
  const detailView = prop( targetCode, attributes );

  const print = prop => path( [`PRI_${toUpper( prop )}`, 'value'], detailView ) || '';

  const [rating, setRating] = useState( 0 );
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      spacing={4}
      className={classes.detailsContainer}
    >
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
              <Grid item>
                <Typography>
                  {print( 'address_full' )}
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  {`${print( 'email' )}`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
