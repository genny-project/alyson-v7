import React from 'react'
import { IconButton } from '@material-ui/core'
import { Col } from '../../components/layouts'
import NotificationsIcon from '@material-ui/icons/Notifications'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import EventIcon from '@material-ui/icons/Event'

import useStyles from './styles'

const SideBarItems = ({ setShowNotes }) => {
  const classes = useStyles()

  return (
    <Col className={classes.itemsContainer}>
      <IconButton>
        <EventIcon className={classes.blueIcon} fontSize="large" />
      </IconButton>
      <IconButton onClick={() => setShowNotes(true)}>
        <NoteAddIcon fontSize="large" className={classes.yellowIcon} />
      </IconButton>
      <IconButton>
        <NotificationsIcon className={classes.blueIcon} fontSize="large" />
      </IconButton>
    </Col>
  )
}

export default SideBarItems
