import React, { useContext, useState } from 'react'
import { Drawer, IconButton, Typography, Divider, LinearProgress } from '@material-ui/core'
import { Col, Row } from '../../components/layouts'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'

import { NoteBarContext } from '../../contexts'

import Notes from './notes'

import useStyles from './styles'

const NoteBar = ({ sidePanelOpen, toggleSidePanel, baseEntities, attributes }) => {
  const { setShowNoteBar } = useContext( NoteBarContext )
  const [apiLoading, setApiLoading] = useState( false )

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
      {apiLoading ? <LinearProgress /> : null}

      <Col alignItems="flex-start">

        <Row
          justify="space-between"
          className={classes.topBar}
        >
          <Typography
            variant="h6"
            color="primary"
          >
Note
          </Typography>
          <IconButton color="primary">
            <SearchIcon color="inherit" />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => setShowNoteBar( false )}
          >
            <ClearIcon color="inherit" />
          </IconButton>
        </Row>
        <Divider />
        <Notes
          baseEntities={baseEntities}
          attributes={attributes}
          setApiLoading={setApiLoading}
        />
      </Col>
    </Drawer>
  )
}

export default NoteBar
