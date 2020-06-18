import React from 'react'
import { Button,TextField, Grid, List, ListItem, ListItemText } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';

const generateId = () => {
  return `_${Math.random().toString( 30 ).substr( 1, 7 )}`
}

const Notes = ({ setViewing }) => {
  const [notes, setNotes] = React.useState( [] )
  const [input, setInput] = React.useState( '' )
  const classes = useStyles();

  const handleSubmit = () => {
    setNotes(( notes ) => notes.concat({
      text: input,
      id: generateId(),
    }))
    setInput( '' )
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
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Grid>
      <Grid
        items
        xs={12}
      >
        <Grid className={classes.control}>
          {notes.map(({ text, id }) => (
            <List>
              <ListItem>
                <ListItemText
                  primary={text}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => removeNotes( id )}
                >
                  <DeleteIcon />
                </Button>
              </ListItem>
            </List>
          ))}
        </Grid>

      </Grid>
    </Grid>
  );
}

export default Notes
