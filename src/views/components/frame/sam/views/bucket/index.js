import React from 'react';
import Board from '@lourenci/react-kanban';
import '@lourenci/react-kanban/dist/styles.css';

import { contains, pickBy, keys, map, replace, path, values, prop, filter } from 'ramda';

import { Typography, Grid, Avatar, Card, CardContent } from '@material-ui/core';

const renderCard = ({ PRI_EMAIL, PRI_NAME, PRI_USER_PROFILE_PICTURE }) => (
  <Card style={{ width: '18rem' }}>
    <CardContent>
      <Typography variant="h6">{prop('value', PRI_NAME || {})}</Typography>
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item>
          <Avatar
            alt={prop('value', PRI_NAME || {})}
            src={prop('value', PRI_USER_PROFILE_PICTURE || {})}
          />
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography>{`${prop('value', PRI_EMAIL || {}) || ''}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
const BucketView = ({ asks, attributes }) => {
  const bucketHeaders = pickBy((val, key) => contains('QUE_BUCKET_HEADER', key), asks);
  const bucketContent = pickBy((val, key) => contains('QUE_BUCKET_CONTENT', key), asks);

  const allInterns = filter(
    ({ PRI_NAME }) => !!PRI_NAME,
    pickBy(
      (val, key) =>
        contains('PER_', key) &&
        key !== 'PER_USER1' &&
        !contains('WRAPPER', key) &&
        !contains('DEVELOPER', key),
      attributes
    )
  );

  const board = {
    columns: map(
      key => ({
        id: replace('QUE_BUCKET_CONTENT_', '', key),
        title: path([key, 'name'], bucketHeaders),
        cards: contains('AVAILABLE', key) ? values(allInterns) : [],
      }),
      keys(bucketHeaders || {})
    ),
  };
  return (
    <div>
      <Board
        initialBoard={board}
        renderColumnHeader={({ title }) => (
          <Typography key={'columnt' + title} color="inherit">
            {title || ''}
          </Typography>
        )}
        renderCard={renderCard}
      />
    </div>
  );
};

export default BucketView;
