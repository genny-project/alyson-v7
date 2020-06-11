import React, { useState } from 'react';
import { prop, path, toUpper, contains, map, keys } from 'ramda';

import { Grid, Typography, Avatar } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { format, parseISO } from 'date-fns';
import useStyles from './styles';

const RowItem = ({ type, label, code, classes, print, rating, setRating }) => (
  <Grid item>
    <Grid container direction="row">
      <Typography className={classes.label}>{label}</Typography>
      {type === 'rating' ? (
        <Rating name="rating" value={rating} onChange={(event, newValue) => setRating(newValue)} />
      ) : type === 'time' ? (
        <Typography>{`${format(parseISO(print(code)), 'h:mm a')}`}</Typography>
      ) : (
        <Typography>{print(code)}</Typography>
      )}
    </Grid>
  </Grid>
);

// TODO: Backend should send us the correct detail view specs

const printIntern = [
  { label: 'Mobile', code: 'mobile' },
  { label: 'Industry', code: 'assoc_industry' },
  { label: 'Education Provider', code: 'assoc_ep' },
  { label: 'Current Course', code: 'current_course' },
  { label: 'Student Id', code: 'student_id' },
  { label: 'Specialisation', code: 'assoc_specialisation' },
  { label: 'Rating', code: 'rating', type: 'rating' },
  { label: 'Transport Options', code: 'transport_options' },
  { label: 'Region', code: 'region' },
  { label: 'Next Scheduled Interview', code: 'next_interview' },
];

const printBeg = [
  { label: 'Host Company', code: 'assoc_host_company' },
  { label: 'Host Company Rep', code: 'assoc_host_company_rep' },
  { label: 'Intern Supervisor', code: 'assoc_intern_supervisor' },
  { label: 'Internship Address', code: 'address_full' },
  { label: 'Industry', code: 'assoc_industry' },
  { label: 'Specialisation', code: 'assoc_occupation' },
  { label: 'Start Date', code: 'start_date' },
  { label: 'Start Time', code: 'time', type: 'time' },
  { label: 'Days Per Week', code: 'days_per_week' },
  { label: 'Duration', code: 'assoc_internship_duration' },
  { label: 'Number of Interns', code: 'assoc_number_of_interns' },
];

const printCpy = [
  { label: 'ABN', code: 'abn' },
  { label: 'Legal Name', code: 'legal_name' },
  { label: 'Company Phone', code: 'landline' },
  { label: 'Decription', code: 'company_description' },
  { label: 'Website', code: 'company_website_url' },
];

const printHcr = [
  { label: 'Job Title', code: 'job_title' },
  { label: 'Mobile', code: 'mobile' },
  { label: 'Linkedin', code: 'linkedin_url' },
];

const Details = ({ attributes, targetCode }) => {
  const detailView = prop(targetCode, attributes);

  const print = prop => path([`PRI_${toUpper(prop || '')}`, 'value'], detailView) || '';

  const detailType = contains('PRI_STUDENT_ID', keys(detailView))
    ? printIntern
    : contains('PRI_START_DATE', keys(detailView))
      ? printBeg
      : contains('LNK_HOST_COMPANY_REP', keys(detailView))
        ? printHcr
        : contains('PRI_ABN')
          ? printCpy
          : [];

  const [rating, setRating] = useState(0);
  const classes = useStyles();

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
        ({ label, code, type }) => (
          <RowItem
            key={code}
            label={label}
            code={code}
            print={print}
            rating={rating}
            setRating={setRating}
            classes={classes}
            type={type}
          />
        ),
        detailType
      )}
    </Grid>
  );
};

export default Details;
