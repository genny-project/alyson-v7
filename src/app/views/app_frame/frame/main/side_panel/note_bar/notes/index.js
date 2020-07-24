import React, { useEffect, useState } from 'react'
import { map, pathOr, length, path } from 'ramda'
import { connect } from 'react-redux'

import { InputBase, Card, CardContent, Snackbar, Divider, Typography, Collapse, IconButton } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'

import Note from './note'
import Tags from './tags'
import { Row } from '../../../components/layouts'

import useStyles from './styles'
import { getAll, postNote, deleteNote, editNote } from './helpers/notes-api'
import formatError from './helpers/format-error'

const Notes = ({ baseEntities, attributes, accessToken, setApiLoading, currentNote, userTags,  setUserTags, notes, setNotes, filteredNotes, user}) => {
  const [noteContent, setNoteContent] = useState( '' )
  const [noteHeader, setNoteHeader] = useState( '' )
  const [error, setError] = useState( '' )
  const [charactersLeftToType, setCharactersLeftToTry] = useState( 250 )
  const [expanded, setExpanded] = useState( true )

  const classes = useStyles({ noteContent, expanded })

  const onError = error => {
    setError( formatError( error ))
    setApiLoading( false )
  }

  const onCloseSnackbar = () => setError( '' )

  const handleExpandClick = () => setExpanded( !expanded )

  const sourceCode = path(['data', 'code'], user)

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
      sourceCode,
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
      sourceCode,
    })
  }

  useEffect(
    () => {
      getAll({ accessToken, setApiLoading, onError, handleResponse, setUserTags, sourceCode })
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
              sourceCode={sourceCode}
            />
          ),
          [...filteredNotes] || [],
        )}
      </div>

      <Row>
        { expanded
          ? <Typography> {`Collapse Note`} </Typography>
          : <Typography> {`Expand to add a note`} </Typography> }
        <IconButton
          className={clsx( classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </Row>

      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
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
      </Collapse>
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
