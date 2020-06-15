import React from 'react';

import { contains, pickBy, keys, map, replace, path, values, filter } from 'ramda';

import Board from './board';
import useStyles from './styles';

const BucketView = ({ asks, attributes }) => {
  const bucketHeaders = pickBy((val, key) => contains('QUE_BUCKET_HEADER', key), asks);
  const bucketContent = pickBy((val, key) => contains('QUE_BUCKET_CONTENT', key), asks);

  const allInterns = values(
    filter(
      ({ PRI_NAME }) => !!PRI_NAME,
      pickBy(
        (val, key) =>
          contains('PER_', key) &&
          key !== 'PER_USER1' &&
          !contains('WRAPPER', key) &&
          !contains('DEVELOPER', key),
        attributes
      )
    )
  );

  const formattedInterns = map(
    ({
      PRI_NAME: { value: name },
      PRI_EMAIL: { value: email },
      PRI_STUDENT_ID: { value: studentId },
      PRI_STATUS_COLOR: { value: statusColor },
      PRI_MOBILE: { value: mobile },
      PRI_USER_PROFILE_PICTURE: { value: profilePicture },
    }) => ({ name, email, studentId, mobile, profilePicture, statusColor }),
    allInterns
  );

  const data = {
    lanes: map(
      key => ({
        id: replace('QUE_BUCKET_CONTENT_', '', key),
        title: path([key, 'name'], bucketHeaders),
        items: contains('AVAILABLE', key) ? formattedInterns : [],
      }),
      keys(bucketHeaders || {})
    ),
  };

  const classes = useStyles();

  return (
    <div className={classes.boardContainer}>
      <Board data={data} />
    </div>
  );
};

export default BucketView;
