import React, { useContext } from 'react'
import { Drawer, IconButton, Typography, Divider } from '@material-ui/core'
import { Col, Row } from '../../components/layouts'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'

import { NoteBarContext } from '../../contexts'

import Notes from './notes'

import useStyles from './styles'

const NoteBar = ({ sidePanelOpen, toggleSidePanel, baseEntities, attributes }) => {
  const { setShowNoteBar } = useContext(NoteBarContext)

  const classes = useStyles()

  return (
    <Drawer
      variant="temporary"
      anchor="right"
      className={classes.drawerLeft}
      classes={{ paper: classes.drawerPaperLeft }}
      open={sidePanelOpen}
      onClose={toggleSidePanel}
      ModalProps={{ keepMounted: true }}
    >
      <Col alignItems="flex-start">
        <Row justify="space-between" className={classes.topBar}>
          <Typography variant="h6" color="primary">{`Add Note`}</Typography>
          <IconButton color="primary">
            <SearchIcon color="inherit" />
          </IconButton>
          <IconButton color="primary" onClick={() => setShowNoteBar(false)}>
            <ClearIcon color="inherit" />
          </IconButton>
        </Row>
        <Divider orientation="horizontal" />
        <Notes baseEntities={baseEntities} attributes={attributes} />
      </Col>
    </Drawer>
  )
}

export default NoteBar
