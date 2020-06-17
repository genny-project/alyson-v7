import React from 'react';

import { compose, not, values, isEmpty, mapObjIndexed } from 'ramda';

import Board from './board';
import useStyles from './styles';

const BucketView = ({ currentSearch, setViewing }) => {
  const buckets = not(isEmpty(currentSearch))
    ? compose(
        values,
        mapObjIndexed((val, key) => ({ searchCode: key, ...val }))
      )(currentSearch)
    : false;

  if (buckets) {
    const classes = useStyles();

    return (
      <div className={classes.boardContainer}>
        <Board data={{ lanes: buckets }} setViewing={setViewing} />
      </div>
    );
  } else {
    return <div />;
  }
};

export default BucketView;
