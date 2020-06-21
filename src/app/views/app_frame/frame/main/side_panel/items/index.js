import React from 'react'
import { Grid, Tooltip, IconButton } from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import EventIcon from '@material-ui/icons/Event';
import { NoteBarContext } from '../../contexts'

import useStyles from './styles'

const SideBarItems = () => {
  const classes = useStyles();
  const { setShowNoteBar } = React.useContext( NoteBarContext )

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid
        className={classes.items}
      >
        <Tooltip
          title="Events"
          placement="top-start"
        >
          <IconButton
            color="primary"
            style={{ color: '#1B7CED' }}
          >
            <EventIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid
        className={classes.items}
      >
        <Tooltip
          title="Notes"
          placement="top-start"
        >
          <IconButton
            color="primary"
            size="large"
            onClick={() => setShowNoteBar( true )}
          >
            <NoteAddIcon
              fontSize="large"
              style={{ color: '#FFC308' }}
            />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid
        className={classes.items}
      >
        <Tooltip
          title="Notification"
          placement="top-start"
        >
          <IconButton
            color="primary"
            style={{ color: '#1B7CED' }}
          >
            <NotificationsIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default SideBarItems
