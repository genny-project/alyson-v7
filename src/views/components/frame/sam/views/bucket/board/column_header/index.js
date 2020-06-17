import React from 'react'

import { Typography } from '@material-ui/core'

import useStyles from './styles'

const ColumnHeader = ({ title, itemsCount }) => {
  const classes = useStyles()

  const text = (title || '') + (itemsCount ? ` (${itemsCount})` : '')

  return <Typography className={classes.title}>{text}</Typography>
}

export default ColumnHeader
