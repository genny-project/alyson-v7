import React from 'react'

import { compose, values, mapObjIndexed } from 'ramda'

import Board from './board'
import useStyles from './styles'

const BucketView = ({ currentSearch, setViewing, current, setCurrent }) => {
  const lanes = compose(
    values,
    mapObjIndexed((val, key) => ({ searchCode: key, ...val })),
  )(currentSearch)

  const classes = useStyles()

  return (
    <div className={classes.boardContainer}>
      <Board data={{ lanes }} current={current} setCurrent={setCurrent} setViewing={setViewing} />
    </div>
  )
}

export default BucketView
