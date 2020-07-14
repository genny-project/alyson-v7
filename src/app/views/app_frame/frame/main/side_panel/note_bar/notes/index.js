import React, { useEffect, useState } from 'react'
import { map, pathOr, length, path } from 'ramda'
import { connect } from 'react-redux'

import {
  Button,
  InputBase,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Snackbar,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import Note from './note'

import { Row } from '../../../components/layouts'

import useStyles from './styles'

import { getAll, postNote, deleteNote, editNote } from './helpers/notes-api'
import formatError from './helpers/format-error'

const Notes = ({ baseEntities, attributes, accessToken, setApiLoading, currentNote }) => {
  const [notes, setNotes] = useState([])
  const [noteContent, setNoteContent] = useState('')
  const [noteHeader, setNoteHeader] = useState('')
  const [error, setError] = useState('')

  const classes = useStyles()

  const onError = error => {
    setError(formatError(error))
    setApiLoading(false)
  }
  const onCloseSnackbar = () => setError('')

  const handleResponse = (response, type) => {
    if (type === 'getAll') {
      setNotes(path(['data', 'items'], response) || [])
    } else if (type === 'edit') {
      setNotes({})
    }

    setApiLoading(false)
  }

  const handleSubmit = () => {
    setNoteHeader('')
    setNoteContent('')
    postNote({
      noteContent,
      noteHeader,
      setNotes,
      accessToken,
      setApiLoading,
      onError,
      handleResponse,
    })
  }

  const removeNotes = id => {
    return deleteNote({
      id,
      accessToken,
      setNotes,
      setApiLoading,
      onError,
      handleResponse,
    })
  }

  useEffect(
    () => {
      getAll({ accessToken, setApiLoading, onError, handleResponse })
    },
    [accessToken, currentNote],
  )

  return (
    <div className={classes.notesContainer}>
      <div className={classes.notesSection}>
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
              setNotes={setNotes}
              accessToken={accessToken}
              setApiLoading={setApiLoading}
              onError={onError}
              handleResponse={handleResponse}
              currentNote={currentNote}
            />
          ),
          [...notes] || [],
        )}
      </div>
      <Card variant="outlined">
        <CardHeader
          title={
            <InputBase
              value={noteHeader}
              style={{ margin: 4 }}
              placeholder="Tags"
              fullWidth
              onChange={e => setNoteHeader(e.target.value)}
            />
          }
        />
        <CardContent>
          <InputBase
            autoFocus
            value={noteContent}
            multiline
            style={{ margin: 4 }}
            placeholder="Post a note"
            fullWidth
            onChange={e => setNoteContent(e.target.value)}
          />
        </CardContent>
        <CardActions disableSpacing>
          <Row justify="flex-end">
            <Button variant="contained" color="inherit" onClick={handleSubmit}>
              Done
            </Button>
          </Row>
        </CardActions>
      </Card>
      <Snackbar open={!!length(error)} autoHideDuration={6000} onClose={onCloseSnackbar}>
        <Alert elevation={6} variant="filled" onClose={onCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}

const mapStateToProps = state => ({
  accessToken: pathOr('', ['keycloak', 'accessToken'], state),
})

export default connect(mapStateToProps)(Notes)
