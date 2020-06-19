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
  const [input, setInput] = React.useState( '' )
  const [showNotes, setShowNotes] = React.useState( false )
  const classes = useStyles();

  const handleSubmit = () => {
    setNotes(( notes ) => notes.concat({
      text: input,
      id: generateId(),
    }))
    setInput( '' )
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
              value={input}
              multiline
              label="Please Enter a note"
              variant="outlined"
              onChange={( e ) => setInput( e.target.value )}
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
              title="Shrimp and Chorizo Paella"
            />
            <CardContent>
              <TextField
                value={input}
                multiline
                label="Please Enter a note"
                variant="outlined"
                onChange={( e ) => setInput( e.target.value )}
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
          {notes.map(({ text, id }) => (
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
                    {text}
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
