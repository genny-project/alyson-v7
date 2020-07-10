import React, { useEffect, useState } from 'react'
import { map, pathOr, length, path } from 'ramda'
import { connect } from 'react-redux'

import {
  Button,
  InputBase,
  Card,
  CardContent,
  CardActions,
  Typography,
  CardHeader,
  Snackbar,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import { Alert } from '@material-ui/lab'

import Note from './note'

import { Col, Row } from '../../../components/layouts'

import useStyles from './styles'

import { getAll, postNote, deleteNote, editNote } from './helpers/notes-api'
import formatError from './helpers/format-error'

const Notes = ({ baseEntities, attributes, accessToken, setApiLoading }) => {
  const [notes, setNotes] = useState([])
  const [noteContent, setNoteContent] = useState('')
  const [noteHeader, setNoteHeader] = useState('')
  const [error, setError] = useState('')

  const classes = useStyles()

  const onError = error => {
    console.log(error)
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
    console.log(response)

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
    [accessToken],
  )

  console.log(notes)

  return (
    <Col top stretch className={classes.notesContainer}>
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
          />
        ),
        [...notes] || [],
      )}
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
    </Col>
  )
}

const mapStateToProps = state => ({
  accessToken: pathOr('', ['keycloak', 'accessToken'], state),
})

export default connect(mapStateToProps)(Notes)
