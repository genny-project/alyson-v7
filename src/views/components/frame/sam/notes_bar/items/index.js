import React from 'react'
import {  Typography, Grid, TextareaAutosize, Tooltip, Fab } from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import EventIcon from '@material-ui/icons/Event';

import useStyles from './styles'

const SideBarItems = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.header}
    >
      <Grid
        items
        xs={12}
        className={classes.items}
      >
        <Typography
          variant="h6"
          color="primary"
        >
          Note
        </Typography>
      </Grid>

      <Grid
        items
        xs={12}
        className={classes.items}
      >
        <TextareaAutosize
          aria-label="minimum height"
          rowsMin={3}
          placeholder="This is a placeholder area"
        />
      </Grid>

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
          title="Notification"
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
