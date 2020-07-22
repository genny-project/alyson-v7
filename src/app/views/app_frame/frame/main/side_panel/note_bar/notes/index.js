import React, { useEffect, useState } from 'react'
import { map, pathOr, length, path } from 'ramda'
import { connect } from 'react-redux'

import { InputBase, Card, CardContent, Snackbar, Divider, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import Note from './note'
import Tags from './tags'

import useStyles from './styles'
import { getAll, postNote, deleteNote, editNote } from './helpers/notes-api'
import formatError from './helpers/format-error'

const Notes = ({ baseEntities, attributes, accessToken, setApiLoading, currentNote }) => {
  const [notes, setNotes] = useState( [] )
  const [userTags, setUserTags] = useState( [] )
  const [noteContent, setNoteContent] = useState( '' )
  const [noteHeader, setNoteHeader] = useState( '' )
  const [error, setError] = useState( '' )
  const [charactersLeftToType, setCharactersLeftToTry] = useState( 250 )

  const classes = useStyles({noteContent})

  const onError = error => {
    setError( formatError( error ))
    setApiLoading( false )
  }
  const onCloseSnackbar = () => setError( '' )

  const handleResponse = ( response, type ) => {
    if ( type === 'getAll' ) {
      setNotes( path( ['data', 'items'], response ) || [] )
    } else if ( type === 'edit' ) {
      setNotes({})
    }

    setApiLoading( false )
  }

  const handleSubmit = tag => {
    setNoteHeader( '' )
    setNoteContent( '' )
    postNote({
      noteContent,
      tag,
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
      getAll({ accessToken, setApiLoading, onError, handleResponse, setUserTags })
    },
    [accessToken, currentNote],
  )

  useEffect(
    () => {
      setCharactersLeftToTry( 250 -  noteContent.length )
    }, [noteContent]
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
        <CardContent>
          <InputBase
            autoFocus
            value={noteContent}
            multiline
            placeholder="Post a note"
            fullWidth
            onChange={e => setNoteContent( e.target.value )}
            className={classes.inputBase}
          />
        </CardContent>
        <Typography
          variant="caption"
          className={classes.charactersLeft}
        >
          {`${charactersLeftToType}/250 characters left`}
        </Typography>
        <Divider className={classes.divider} />
        <Tags
          userTags={userTags}
          onSelect={handleSubmit}
          noteContent={noteContent}
        />
      </Card>

      <Snackbar
        open={!!length( error )}
        autoHideDuration={6000}
        onClose={onCloseSnackbar}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={onCloseSnackbar}
          severity="error"
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}

const mapStateToProps = state => ({
  accessToken: pathOr( '', ['keycloak', 'accessToken'], state ),
})

export default connect( mapStateToProps )( Notes )
