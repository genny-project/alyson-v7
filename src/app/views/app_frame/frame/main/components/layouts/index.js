import React from 'react'
import { map, addIndex, flatten } from 'ramda'
import { Grid } from '@material-ui/core'

const Row = ({
  stretch,
  left,
  top,
  right,
  bottom,
  spaceBetween,
  children,
  spacing,
  alignItems,
  justify,
  fullWidth,
  style,
  ...rest
}) => (
  <Grid
    container
    direction="row"
    spacing={spacing || spacing === 0 ? spacing : 1}
    alignItems={
      stretch ? 'stretch' : top ? 'flex-start' : bottom ? 'flex-end' : alignItems || 'center'
    }
    justify={
      spaceBetween
        ? 'space-between'
        : left
          ? 'flex-start'
          : right
            ? 'flex-end'
            : justify || 'center'
    }
    style={{ ...style, ...(fullWidth ? { width: '100%' } : {}) }}
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

const Col = ({
  stretch,
  left,
  top,
  right,
  bottom,
  spaceBetween,
  children,
  spacing,
  alignItems,
  justify,
  fullWidth,
  style,
  ...rest
}) => (
  <Grid
    container
    direction="column"
    spacing={spacing || spacing === 0 ? spacing : 1}
    alignItems={
      stretch ? 'stretch' : left ? 'flex-start' : right ? 'flex-end' : alignItems || 'center'
    }
    style={{ ...style, ...(fullWidth ? { width: '100%' } : {}) }}
    justify={
      spaceBetween
        ? 'space-between'
        : top
          ? 'flex-start'
          : bottom
            ? 'flex-end'
            : justify || 'center'
    }
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
