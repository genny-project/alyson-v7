import React from 'react'
import { map, addIndex, flatten } from 'ramda'
import { Grid } from '@material-ui/core'

const Row = ({ children, spacing, alignItems, justify, ...rest }) => (
  <Grid
    container
    direction="row"
    spacing={spacing || 1}
    alignItems={alignItems || 'center'}
    justify={justify || 'center'}
    {...rest}
  >
    {addIndex(map)(
      (child, index) => (
        <Grid key={index} item>
          {child}
        </Grid>
      ),
      flatten([children]),
    )}
  </Grid>
)

const Col = ({ children, spacing, alignItems, justify, ...rest }) => (
  <Grid
    container
    direction="column"
    spacing={spacing || 1}
    alignItems={alignItems || 'center'}
    justify={justify || 'center'}
    {...rest}
  >
    {addIndex(map)(
      (child, index) => (
        <Grid key={index} item>
          {child}
        </Grid>
      ),
      flatten([children]),
    )}
  </Grid>
)

export { Row, Col }