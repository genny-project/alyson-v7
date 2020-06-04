import React from 'react';
import { map } from 'ramda';

import { Grid, Typography } from '@material-ui/core';

const ColumnItems = props => map( child => (
  <Grid item>
    <Typography>
      { child }
    </Typography>
  </Grid>
), props.children );

export default ColumnItems;
