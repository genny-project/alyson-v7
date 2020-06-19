import React from 'react'
import {  Typography, Grid, TextareaAutosize, Tooltip, Fab } from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import EventIcon from '@material-ui/icons/Event';
import { NotesContext } from '../../contexts'

import useStyles from './styles'

const SideBarItems = () => {
  const classes = useStyles();
  const { setShowNotes } = React.useContext( NotesContext )

  return (
    <Grid
      container
      className={classes.header}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid
        items
        xs={12}
        className={classes.items}
      >
        <Tooltip
          title="Notes"
          placement="top-start"
        >
          <Fab
            color="primary"
            onClick={() => setShowNotes( true )}
          >
            <NoteAddIcon color="inherit" />
          </Fab>
        </Tooltip>
      </Grid>

      <Grid
        items
        xs={12}
        className={classes.items}
      >
        <Tooltip
          title="Notification"
          placement="top-start"
        >
          <Fab
            color="primary"
          >
            <NotificationsIcon color="inherit" />
          </Fab>
        </Tooltip>
      </Grid>

      <Grid
        items
        xs={12}
        className={classes.items}
      >
        <Tooltip
          title="Events"
          placement="top-start"
        >
          <Fab
            color="primary"
          >
            <EventIcon color="inherit" />
          </Fab>
        </Tooltip>
      </Grid>

    </Grid>
  )
}

export default SideBarItems
