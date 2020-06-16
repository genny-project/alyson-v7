import React from 'react';

import { contains, pickBy, keys, map, replace, path, values, filter, pathOr } from 'ramda';

import Board from './board';
import useStyles from './styles';

const BucketView = ({ asks, attributes, setViewing }) => {
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
    intern => ({
      status: pathOr('', ['PRI_STATUS', 'value'], intern),
      name: pathOr('', ['PRI_NAME', 'value'], intern),
      email: pathOr('', ['PRI_EMAIL', 'value'], intern),
      studentId: pathOr('', ['PRI_STUDENT_ID', 'value'], intern),
      mobile: pathOr('', ['PRI_MOBILE', 'value'], intern),
      profilePicture: pathOr('', ['PRI_USER_PROFILE_PICTURE', 'value'], intern),
      statusColor: pathOr('', ['PRI_STATUS_COLOR', 'value'], intern),
      targetCode: pathOr('', ['PRI_EMAIL', 'baseEntityCode'], intern),
    }),
    allInterns
  );

  const availableInterns = filter(({ status }) => status === 'AVAILABLE', formattedInterns);

  const data = {
    lanes: map(
      key => ({
        id: replace('QUE_BUCKET_CONTENT_', '', key),
        title: path([key, 'name'], bucketHeaders),
        items: contains('AVAILABLE', key) ? availableInterns : [],
      }),
      keys(bucketHeaders || {})
    ),
  };

  const classes = useStyles();

  return (
    <div className={classes.boardContainer}>
      <Board data={data} setViewing={setViewing} />
    </div>
  );
};

export default BucketView;
