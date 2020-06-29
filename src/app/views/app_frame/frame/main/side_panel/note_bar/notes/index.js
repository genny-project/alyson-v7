import React, { useEffect, useState } from 'react'
import { map, pathOr } from 'ramda'
import { connect } from 'react-redux'

import {
  Button,
  InputBase,
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

import { Col, Row } from '../../../components/layouts'

import useStyles from './styles'

import { getAll, postNote, deleteNote, editNote } from './helpers/notes-api'

const Notes = ({ baseEntities, attributes, accessToken }) => {
  const [notes, setNotes] = useState({})
  const [noteContent, setNoteContent] = useState( '' )
  const [noteHeader, setNoteHeader] = useState( '' )
  const [showAddNote, setShowAddNote] = useState( true )
  const [apiLoading, setApiLoading] = useState( false )

  const classes = useStyles()

  const handleSubmit = () => {
    setNoteHeader( '' )
    setNoteContent( '' )
    setShowAddNote( false )

    postNote({ noteContent, noteHeader, setNotes, accessToken, setApiLoading })
  }

  const handleShowAddNote = () => setShowAddNote( showAddNote => !showAddNote )

  const removeNotes = id => {
    return deleteNote({ id, accessToken })
    // setNotes(( notes ) => notes.filter(( note ) => note.id !== id ))
  }

  console.error( 'notes', notes )

  useEffect(() => {
    setTimeout(() => {
      getAll({ setNotes, accessToken, setApiLoading })
    }, 3000 )
  }, [accessToken, notes] )

  return (
    <Col
      alignItems="flex-start"
      justify="flex-start"
    >
      <Grid
        xs={12}
        className={classes.buttonControl}
      >
        <Button
          className={classes.button}
          color="secondary"
          onClick={handleShowAddNote}
          fullWidths
        >
          {showAddNote ? 'Close notes' : 'Add a note...'}
        </Button>
      </Grid>

      <Col
        alignItems="flex-start"
        justify="flex-start"
      >
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
      {showAddNote && (
        <Col
          alignItems="flex-start"
          justify="flex-start"
        >
          <Card
            className={classes.card}
            variant="outlined"
          >
            <CardHeader
              title={(
                <InputBase
                  value={noteHeader}
                  style={{ margin: 4 }}
                  placeholder="Tags"
                  fullWidth
                  onChange={e => setNoteHeader( e.target.value )}
                />
)}
            />
            <CardContent>
              <InputBase
                autoFocus
                value={noteContent}
                multiline
                style={{ margin: 4 }}
                placeholder="Post a note"
                fullWidth
                onChange={e => setNoteContent( e.target.value )}
              />
            </CardContent>
            <CardActions disableSpacing>
              <Row justify="flex-end">
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={handleSubmit}
                >
                Done
                </Button>
              </Row>
            </CardActions>
          </Card>
        </Col>
      )}
    </Col>
  )
}

const mapStateToProps = state => ({
  accessToken: pathOr( '', ['keycloak', 'accessToken'], state ),
})

export default connect( mapStateToProps )( Notes )
