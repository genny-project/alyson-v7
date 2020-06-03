import React from 'react';
import { compose, prop, path, toUpper } from 'ramda';

import { Grid, Typography, Avatar } from '@material-ui/core';

const Details = ({ attributes, targetCode }) => {
  const detailView = prop( targetCode, attributes );

  const print = prop => path( [`PRI_${toUpper( prop )}`, 'value'], detailView );

  return (
    <Grid
      container
      direction="column"
      spacing={2}
    >
      <Grid item>
        <Typography variant="h5">
Details
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        spacing={2}
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
            spacing={2}
          >
            <Grid item>
              <Typography>
                {print( 'name' )}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                {print( 'address_full' )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography>
          {`Email - ${print( 'email' )}`}
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          {`Gender - ${print( 'gender' )}`}
        </Typography>
      </Grid>
      <Grid>
        {print( 'is_supervisor' ) ? (
          <Typography>
Supervisor
          </Typography>
        ) : null}
      </Grid>
      <Grid>
        {print( 'is_admin' ) ? (
          <Typography>
Admin
          </Typography>
        ) : null}
      </Grid>
      <Grid>
        {print( 'is_agent' ) ? (
          <Typography>
Agent
          </Typography>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default Details;
