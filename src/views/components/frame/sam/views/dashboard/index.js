import React from 'react';
import { prop, path } from 'ramda';
import { Typography, Container, Grid } from '@material-ui/core';

const Dashboard = ({ frames, asks, user, attributes }) => {
  const userCompany = prop(path(['attributes', 'LNK_AGENCY', 'value'], user), attributes);
  const companyName = path(['PRI_NAME', 'value'], userCompany);
  return (
    <Grid container direction="column" justify="flex-start" alignItems="center">
      <Grid item>
        <Container>
          <Typography>{`${user.data.name} with ${companyName}`}</Typography>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
