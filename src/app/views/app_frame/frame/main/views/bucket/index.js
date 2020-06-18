import React, { useState } from 'react'

import { compose, not, values, isEmpty, mapObjIndexed } from 'ramda'

import Board from './board'
import useStyles from './styles'

const BucketView = ({ currentSearch, setViewing, current, setCurrent }) => {
  const buckets = not(isEmpty(currentSearch))
    ? compose(
        values,
        mapObjIndexed((val, key) => ({ searchCode: key, ...val })),
      )(currentSearch)
    : false

  const refreshBuckets = () =>
    setViewing({
      code: 'QUE_TAB_BUCKET_VIEW',
      targetCode: 'PER_USER1',
    })

  console.log(current)

  if (buckets) {
    const classes = useStyles()

    return (
      <div className={classes.boardContainer}>
        <Board
          data={{ lanes: buckets }}
          current={current}
          setCurrent={setCurrent}
          setViewing={setViewing}
          refreshBuckets={refreshBuckets}
        />
      </div>
    )
  } else {
    return <div />
  }
}

export default BucketView
