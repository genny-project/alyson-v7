import React, { useState } from 'react'
import { map, mapObjIndexed, values, length } from 'ramda'

import { Grid } from '@material-ui/core'
import ColumnHeader from '../column_header'
import Item from '../item'

import useStyles from './styles'

const Lane = ({ title, id, items, setViewing }) => {
  const [expand, setExpand] = useState(true)
  const classes = useStyles({ expand: expand && length(items) > 0 })
  return (
    <Grid item key={'lane' + id}>
      <Grid
        className={classes.lane}
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        key={'column' + id}
        spacing={1}
        wrap="nowrap"
      >
        <Grid item key={'colItem' + id}>
          <ColumnHeader title={title} key={'colHeader' + id} itemsCount={length(items || [])} />
        </Grid>
        {map(item =>
          values(
            mapObjIndexed((val, key) => (
              <Grid item key={'gridItem' + key}>
                <Item
                  expandedColumn={expand && length(items) > 0}
                  item={{ ...val, targetCode: key }}
                  setViewing={setViewing}
                  key={'gridItemItem' + key}
                />
              </Grid>
            ))(item),
          ),
        )(items)}
      </Grid>
    </Grid>
  )
}

export default Lane
