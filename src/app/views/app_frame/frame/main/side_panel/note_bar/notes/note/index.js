import React from 'react'

import DateFnsAdapter from '@date-io/date-fns'

import { Card, CardContent, CardActions, Typography, Button } from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'

const Note = ({ content, id, tags, createdDate, removeNotes }) => {
  const dateFns = new DateFnsAdapter()

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography>{content}</Typography>
        <Typography variant="subtitle1">{`${dateFns.date(createdDate)}`}</Typography>
      </CardContent>
      <CardActions>
        <Button color="secondary" onClick={() => removeNotes(id)}>
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  )
}

export default Note
