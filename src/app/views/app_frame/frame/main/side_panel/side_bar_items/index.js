import React from 'react'
import { Grid, Tooltip, IconButton } from '@material-ui/core'
import { Row, Col } from '../../components/layouts'
import NotificationsIcon from '@material-ui/icons/Notifications'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import EventIcon from '@material-ui/icons/Event'
import { NoteBarContext } from '../../contexts'

import useStyles from './styles'

const SideBarItems = () => {
  const classes = useStyles()
  const { setShowNoteBar } = React.useContext(NoteBarContext)

  return (
    <Col className={classes.itemsContainer}>
      <IconButton>
        <EventIcon className={classes.blueIcon} fontSize="large" />
      </IconButton>
      <IconButton onClick={() => setShowNoteBar(true)}>
        <NoteAddIcon fontSize="large" className={classes.yellowIcon} />
      </IconButton>
      <IconButton>
        <NotificationsIcon className={classes.blueIcon} fontSize="large" />
      </IconButton>
    </Col>
  )
}

export default SideBarItems
