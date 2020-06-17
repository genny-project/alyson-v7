import React from 'react'

import { map, any } from 'ramda'

import { Grid } from '@material-ui/core'

import Lane from './lane'

import useStyles from './styles'

const isBucket = key => any(test => key.indexOf(test) >= 0)(['APPLICATIONS', 'AVAILABLE_INTERNS'])

const Board = ({ data: { lanes, meta }, setViewing }) => {
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
        ({
          metaData: {
            SCH_TITLE: { value: title },
          },
          data: items,
          searchCode: id,
        }) =>
          isBucket(id) ? (
            <Lane key={'lane' + id} setViewing={setViewing} title={title} items={items} id={id} />
          ) : (
            <div key={id} />
          ),
        lanes || [],
      )}
    </Grid>
  )
}

export default Board
