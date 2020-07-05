import React from 'react'

import { Typography } from '@material-ui/core'
import { Row } from '../../../../components/layouts'
import useStyles from './styles'

const ColumnHeader = ({ title, itemsCount, icon }) => {
  const classes = useStyles()

  const text = (title || '') + (itemsCount ? ` (${itemsCount})` : '')

  return (
    <Row>
      {icon ? icon : null}
      <Typography color="primary" className={classes.title}>
        {text}
      </Typography>
    </Row>
  )
}

export default ColumnHeader
