import React, { useState } from 'react';
import { prop, path, toUpper, contains, map } from 'ramda';

import { Grid, Typography, Avatar } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import useStyles from './styles';

const RowItem = ({ label, code, classes, print, rating, setRating }) => (
  <Grid item>
    <Grid container direction="row">
      <Typography className={classes.label}>{label}</Typography>
      {code === 'rating' ? (
        <Rating name="rating" value={rating} onChange={(event, newValue) => setRating(newValue)} />
      ) : (
        <Typography>{print(code)}</Typography>
      )}
    </Grid>
  </Grid>
);

const printPer = [
  { label: 'Mobile', code: 'mobile' },
  { label: 'Industry', code: 'assoc_industry' },
  { label: 'Education Provider', code: 'assoc_ep' },
  { label: 'Current Course', code: 'current_course' },
  { label: 'Student Id', code: 'student_id' },
  { label: 'Specialisation', code: 'assoc_specialisation' },
  { label: 'Rating', code: 'rating' },
  { label: 'Transport Options', code: 'transport_options' },
  { label: 'Region', code: 'region' },
  { label: 'Next Scheduled Interview', code: 'next_interview' },
];

const printBeg = [];

const Details = ({ attributes, targetCode }) => {
  const detailView = prop(targetCode, attributes);

  const print = prop => path([`PRI_${toUpper(prop)}`, 'value'], detailView) || '';

  const [rating, setRating] = useState(0);
  const classes = useStyles();

  console.log(targetCode);

  return (
    <Grid container direction="column" spacing={4} className={classes.detailsContainer}>
      <Grid item>
        <Typography variant="h5">{print('name')}</Typography>
      </Grid>
      <Grid item>
        <Grid container direction="row" spacing={2} alignItems="center">
          <Grid item>
            <Avatar alt={print('name')} src={print('user_profile_picture')} />
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography>{print('address_full')}</Typography>
              </Grid>
              <Grid item>
                <Typography>{`${print('email')}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {map(
        ({ label, code }) => (
          <RowItem
            key={code}
            label={label}
            code={code}
            print={print}
            rating={rating}
            setRating={setRating}
            classes={classes}
          />
        ),
        contains('PER', targetCode) ? printPer : printBeg
      )}
    </Grid>
  );
};

export default Details;
