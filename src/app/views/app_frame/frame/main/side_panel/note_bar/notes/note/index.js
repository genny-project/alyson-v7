import React from 'react'

import DateFnsAdapter from '@date-io/date-fns'

import { Card, CardContent, CardActions, Typography, Button } from '@material-ui/core'
import useStyles from './styles'


import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'

const Note = ({ content, id, tags, created, removeNotes, baseEntities, targetCode}) => {
  const dateFns = new DateFnsAdapter()
  const name = baseEntities[targetCode].name
  const classes = useStyles()


  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        <Typography>{name}</Typography>
        <Typography>{content}</Typography>
        <Typography variant="subtitle1">{created}</Typography>
      </CardContent>
      <CardActions>
        <Button color="secondary" onClick={() => removeNotes(id)}>
          <DeleteIcon />
        </Button>
        <Button
          color="secondary"
        >
          <EditIcon />
        </Button>
        <Button
          color="secondary"
        >
          <VisibilityIcon />
        </Button>
      </CardActions>
    </Card>
  )
}

export default Note
