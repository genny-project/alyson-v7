import React, { useEffect, useState } from 'react'
import { map, prop } from 'ramda'
import {
  Button,
  TextField,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Typography,
  CardHeader,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

import Note from './note'

import { Col } from '../../../components/layouts'

import useStyles from './styles'

import { getAll, postNote, deleteNote, editNote } from './helpers/notes-api'

const Notes = ({ baseEntities, attributes }) => {
  const [notes, setNotes] = useState({})
  const [noteContent, setNoteContent] = useState('')
  const [noteHeader, setNoteHeader] = useState('')
  const [showAddNote, setShowAddNote] = useState(false)

  const classes = useStyles()

  const handleSubmit = () => {
    setNoteHeader('')
    setNoteContent('')
    setShowAddNote(false)

    postNote({ noteContent, noteHeader, setNotes })
  }

  const handleShowAddNote = () => setShowAddNote(true)

  const removeNotes = id => {
    return deleteNote({ id })
    // setNotes(( notes ) => notes.filter(( note ) => note.id !== id ))
  }

  useEffect(() => {
    getAll({ setNotes })
  }, [])

  return (
    <Col alignItems="flex-start" justify="flex-start">
      <Grid xs={12} className={classes.buttonControl}>
        <Button
          className={classes.button}
          color="secondary"
          onClick={handleShowAddNote}
          startIcon={<AddIcon />}
          fullWidth
        >
          Take a note...
        </Button>
      </Grid>

      {showAddNote && (
        <Col alignItems="flex-start" justify="flex-start">
          <Card className={classes.card} variant="outlined">
            <CardHeader
              title={
                <TextField
                  value={noteHeader}
                  multiline
                  style={{ margin: 4 }}
                  placeholder="Title"
                  fullWidth
                  onChange={e => setNoteHeader(e.target.value)}
                />
              }
            />
            <CardContent>
              <TextField
                value={noteContent}
                multiline
                style={{ margin: 4 }}
                placeholder="Take a note"
                fullWidth
                onChange={e => setNoteContent(e.target.value)}
              />
            </CardContent>
            <CardActions disableSpacing>
              <Button variant="contained" color="inherit" onClick={handleSubmit}>
                Done
              </Button>
            </CardActions>
          </Card>
        </Col>
      )}
      <Col alignItems="flex-start" justify="flex-start">
        {map(
          ({ id, ...rest }) => (
            <Note
              baseEntities={baseEntities}
              id={id}
              key={`note${id}`}
              {...rest}
              removeNotes={removeNotes}
              attributes={attributes}
              editNote={editNote}
            />
          ),
          [...notes] || [],
        )}
      </Col>
    </Col>
  )
}

export default Notes
