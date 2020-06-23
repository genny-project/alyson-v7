/* eslint-disable react/jsx-key */
import React from 'react'

import { Button,TextField, Grid, Card, CardActionArea, CardContent, CardActions, Typography, CardHeader } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';

import { NotesApi } from '../../../../../../apis'

import useStyles from './styles';

const generateId = () => {
  return `_${Math.random().toString( 30 ).substr( 1, 7 )}`
}

const Notes = ({ baseEntities }) => {
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

  const { data, loading } = NotesApi( 'https://internmatch-cyrus.gada.io/v7/notes/datatable?length=20' )

  const dataValue =  data && data.filter(({ sourceCode }) => sourceCode === 'PER_USER1' )

  console.error( dataValue )
  console.error( 'baseEntities',  baseEntities )

  return (
    data && (
      <div>
        {dataValue.map(({ content, created, id, sourceCode, targetCode }) => {
          const name = baseEntities[sourceCode].name

          console.error( 'name', name )

          return (
            <Card
              className={classes.card}
              variant="outlined"
            >
              <CardActionArea>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    {name}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="h2"
                  >
                    {content}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="h2"
                  >
                    {created}
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
          )
        })}
      </div>
    )
  )

  // return (
  //   <Grid
  //     container
  //     className={classes.root}
  //   >
  //     <Grid
  //       xs={12}
  //       className={classes.buttonControl}
  //     >
  //       <Button
  //         className={classes.button}
  //         variant="contained"
  //         color="secondary"
  //         onClick={handleShowNotes}
  //         startIcon={<AddIcon />}
  //         fullWidth
  //       >
  //         Take a note...
  //       </Button>
  //     </Grid>

  //     {showNotes && (
  //       <Grid
  //         xs={12}
  //         className={classes.control}
  //       >
  //         <Card
  //           className={classes.card}
  //           variant="outlined"
  //         >
  //           <CardHeader
  //             title={(
  //               <TextField
  //                 value={noteHeader}
  //                 multiline
  //                 style={{ margin: 4 }}
  //                 placeholder="Title"
  //                 fullWidth
  //                 onChange={( e ) => setNoteHeader( e.target.value )}
  //               />
  //       )}
  //           />
  //           <CardContent>

  //             <TextField
  //               value={noteContent}
  //               multiline
  //               style={{ margin: 4 }}
  //               placeholder="Take a note"
  //               fullWidth
  //               onChange={( e ) => setNoteContent( e.target.value )}
  //             />
  //           </CardContent>
  //           <CardActions disableSpacing>
  //             <Button
  //               variant="contained"
  //               color="inherit"
  //               className={clsx( classes.expand )}
  //               onClick={handleSubmit}
  //             >
  //               Done
  //             </Button>
  //           </CardActions>
  //         </Card>
  //       </Grid>

  //     )
  //   }
  //     <Grid
  //       xs={12}
  //       className={classes.control}
  //     >
  //       {notes.map(({ headerText, contentText, id }) => (
  //         <Card
  //           className={classes.card}
  //           variant="outlined"
  //         >
  //           <CardActionArea>
  //             <CardContent>
  //               <Typography
  //                 gutterBottom
  //                 variant="h5"
  //                 component="h2"
  //               >
  //                 {headerText}
  //               </Typography>
  //             </CardContent>
  //             <CardContent>
  //               <Typography
  //                 gutterBottom
  //                 variant="subtitle1"
  //                 component="h2"
  //               >
  //                 {contentText}
  //               </Typography>
  //             </CardContent>
  //           </CardActionArea>
  //           <CardActions>
  //             <Button
  //               variant="contained"
  //               color="primary"
  //               onClick={() => removeNotes( id )}
  //             >
  //               <DeleteIcon />
  //             </Button>
  //           </CardActions>
  //         </Card>
  //       ))}
  //     </Grid>
  //   </Grid>
  // );
}

export default Notes
