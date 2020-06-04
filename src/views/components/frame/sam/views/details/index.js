import React, { useState } from 'react';
import { compose, prop, path, toUpper, map } from 'ramda';

import { Grid, Typography, Avatar } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import useStyles from './styles';
import { ColumnItems, RowItems } from '../../layouts';

const listOfItems = ['mobile', 'email', 'address_full', 'gender', 'is_agent', 'is_admin'];

const Details = ({ attributes, targetCode }) => {
  const detailView = prop( targetCode, attributes );

  const print = prop => path( [`PRI_${toUpper( prop )}`, 'value'], detailView ) || '';

  const getProps =  prop  => path( [`PRI_${toUpper( prop )}`], detailView );
  const makeRows = map( getProps ,listOfItems );

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
              <ColumnItems>
                {[print( 'name' ),  `${print( 'address_full' )}`]}
              </ColumnItems>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <RowItems>
        {makeRows}
      </RowItems>
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
    </Grid>
  );
};

export default Details;
