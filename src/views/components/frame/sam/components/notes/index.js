/* eslint-disable react/jsx-key */
import React from 'react'
import { Button,TextField, Grid, Card, CardActionArea, CardContent, CardActions, Typography, IconButton, CardHeader } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';

import useStyles from './styles';

const generateId = () => {
  return `_${Math.random().toString( 30 ).substr( 1, 7 )}`
}

const Notes = ({ setViewing }) => {
  const [notes, setNotes] = React.useState( [] )
  const [noteContent, setNoteContent] = React.useState( '' )
  const [noteHeader, setNoteHeader] = React.useState( '' )
  const [showNotes, setShowNotes] = React.useState( false )
  const classes = useStyles();

  const handleSubmit = () => {
    setNotes(( notes ) => notes.concat({
      headerText: noteHeader,
      contentText: noteContent,
      id: generateId(),
    }))
    setNoteHeader( '' )
    setNoteContent( '' )
    setShowNotes( false )
  }

  const handleShowNotes = () => {
    setShowNotes( true )
  }

  const removeNotes = ( id ) => setNotes(( notes ) => notes.filter(( note ) => note.id !== id ))

  return (
    <Grid
      container
      className={classes.root}
      spacing={2}
    >
      <Grid
        items
        className={classes.control}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleShowNotes}
          startIcon={<CreateIcon />}
        >
          Add a note
        </Button>
      </Grid>

      {/* <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid
            items
            className={classes.control}
          >
            <TextField
              value={noteContent}
              multiline
              label="Please Enter a note"
              variant="outlined"
              onChange={( e ) => setNoteContent( e.target.value )}
            />
          </Grid>
          <Grid
            items
            className={classes.control}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
          >
            <CreateIcon />
          </Button>
        </Grid>*/}

      {showNotes && (
        <Grid>
          <Card className={classes.root}>
            <CardHeader
              action={(
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
          )}
              title={(
                <TextField
                  value={noteHeader}
                  multiline
                  style={{ margin: 4 }}
                  placeholder="Title"
                  fullWidth
                  onChange={( e ) => setNoteHeader( e.target.value )}
                />
)}
            />
            <CardContent>
              <TextField
                value={noteContent}
                multiline
                style={{ margin: 4 }}
                placeholder="Take a note"
                fullWidth
                onChange={( e ) => setNoteContent( e.target.value )}
              />
            </CardContent>
            <CardActions disableSpacing>
              <Button
                variant="contained"
                color="secondary"
                className={clsx( classes.expand )}
                onClick={handleSubmit}
              >
                <CreateIcon />
              </Button>
            </CardActions>
          </Card>
        </Grid>

      )
    }

      <Grid
        items
        xs={12}
      >
        <Grid className={classes.control}>
          {notes.map(({ headerText, contentText, id }) => (
            <Card
              className={classes.card}
              color="inherit"
            >
              <CardActionArea>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    {headerText}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="h2"
                  >
                    {contentText}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => removeNotes( id )}
                >
                  <DeleteIcon />
                </Button>
              </CardActions>
            </Card>
          ))}
        </Grid>

      </Grid>
    </Grid>
  );
}

export default Notes
