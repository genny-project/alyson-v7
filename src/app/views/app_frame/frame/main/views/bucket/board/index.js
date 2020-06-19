import React from 'react'

import { map, any } from 'ramda'

import { Grid } from '@material-ui/core'

import Lane from './lane'

import useStyles from './styles'

const isBucket = key => any(test => key.indexOf(test) >= 0)(['APPLICATIONS', 'AVAILABLE_INTERNS'])

const Board = ({ data: { lanes, meta }, setViewing, current, setCurrent, refreshBuckets }) => {
  const classes = useStyles()

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="flex-start"
      alignItems="stretch"
      spacing={2}
      wrap="nowrap"
    >
      {map(
        ({ metaData, data: items, searchCode: id }) =>
          isBucket(id) ? (
            <Lane
              key={'lane' + id}
              refreshBuckets={refreshBuckets}
              current={current}
              setCurrent={setCurrent}
              setViewing={setViewing}
              items={items}
              id={id}
              metaData={metaData}
            />
          ) : (
            <div key={id} />
          ),
        lanes || [],
      )}
    </Grid>
  )
}

export default Board
