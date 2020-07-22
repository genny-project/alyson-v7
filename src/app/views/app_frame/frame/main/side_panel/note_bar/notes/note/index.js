import React, { useState } from 'react'

import copy from 'copy-to-clipboard'
import { pathOr, prop } from 'ramda'
import DateFnsAdapter from '@date-io/date-fns'
import { Row, Col } from '../../../../components/layouts'
import tagAbbreviation from '../helpers/create-tag-abbreviation'
import {
  Card,
  Badge,
  Typography,
  Button,
  Avatar,
  Popper,
  ButtonGroup,
  InputBase,
  Chip,
  Snackbar
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import useStyles from './styles'

import MoreIcon from '@material-ui/icons/MoreVert'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import ClearIcon from '@material-ui/icons/Clear'
import FileCopyIcon from '@material-ui/icons/FileCopy';

const Note = ({
  content,
  sourceCode,
  id,
  tags,
  created,
  removeNotes,
  baseEntities,
  targetCode,
  attributes,
  editNote,
  setNotes,
  accessToken,
  setApiLoading,
  onError,
  handleResponse,
  currentNote,
}) => {
  const [hover, setHover] = useState( false )
  const [editing, setEditing] = useState( false )
  const [newContent, setNewContent] = useState( content )
  const [snackBarOpen, setSnackBarOpen] = useState( false )

  const currentNoteId = prop( 'id', currentNote )

  const dateFns = new DateFnsAdapter()
  const parsedDate = new Date( created )

  const name = baseEntities[sourceCode].name
  const nameInitials = name.split( ' ' ).map(( n ) => n[0] ).join( '' );
  const profileImage = pathOr( '', [targetCode, 'PRI_IMAGE_URL', 'value'], attributes )
  const tag =  pathOr( 'N/A', [0, 'name'], tags )

  const handleSubmit = () => {
    editNote({ newContent, id, setNotes, accessToken, setApiLoading, onError, handleResponse })
    setEditing( false )
    setHover( false )
  }

  const classes = useStyles({ hover, isCurrent: currentNoteId === id })

  const handleClickSnackBar = () => {
    copy(content)
    setSnackBarOpen(true)
  }

  const handleCloseSnackbar = () => setSnackBarOpen(false)

  return (
    <Badge
      color="secondary"
      variant="dot"
      invisible={currentNoteId !== id}
    >
      <div
        onMouseEnter={event => setHover( event.currentTarget )}
        onMouseLeave={() => setHover( false )}
        className={classes.card}
      >
        <Row className={classes.cardContainer}>
          {profileImage
            ? (
              <Avatar
                variant="rounded"
                src={profileImage}
              />
            )
            : (
              <Avatar>
                {nameInitials}
              </Avatar>
            )}

          <Col
            alignItems="flex-start"
            spacing={0}
          >
            <Row stretch>
              <Typography
                variant="subtitle2"
                color={hover ? 'primary' : 'textPrimary'}
              >
                {name}
              </Typography>
              <Typography
                variant="caption"
                color={hover ? 'primary' : 'textPrimary'}
              >
                {`${dateFns.format( parsedDate, 'd\' \'MMM\' \'yy\' \'p' )}`}
              </Typography>
              <Chip
                size="small"
                label={tagAbbreviation( tag )}
                className={classes.tag}
              />
            </Row>
            {editing ? (
              <InputBase
                autoFocus
                value={newContent}
                onChange={event => setNewContent( event.target.value )}
                className={classes.input}
              />
            ) : (
              <Typography
                variant="body2"
                className={classes.content}
              >
                {content}
              </Typography>
            )}
          </Col>
          <Popper
            open={!!hover}
            anchorEl={hover}
            placement="top-end"
            className={classes.popper}
          >
            <Card>
              <ButtonGroup
                color="primary"
                size="small"
              >
                <Button>
                  <FileCopyIcon
                    fontSize="small"
                    onClick={handleClickSnackBar}
                  />
                </Button>
                <Button>
                  {editing ? (
                    <ClearIcon
                      fontSize="small"
                      onClick={() => setEditing( false )}
                    />
                  ) : (
                    <EditIcon
                      fontSize="small"
                      onClick={() => setEditing( true )}
                    />
                  )}
                </Button>
                <Button>
                  <DeleteIcon
                    fontSize="small"
                    onClick={() => removeNotes( id )}
                  />
                </Button>
                <Button>
                  <MoreIcon fontSize="small" />
                </Button>
              </ButtonGroup>
            </Card>
          </Popper>
        </Row>
        <Row>
          {editing ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSubmit}
            >
              {'SUBMIT'}
            </Button>
          ) : (
            <div />
          )}
        </Row>

      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="success"
        >
          {`copied to clipboard`}
        </Alert>
      </Snackbar>
      </div>
    </Badge>
  )
}

export default Note
