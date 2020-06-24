import React, { useState } from 'react'

import { Drawer, IconButton, Tooltip, Grid } from '@material-ui/core'

import { Row, Col } from '../components/layouts'
import NextIcon from '@material-ui/icons/NavigateNext'
import CloseIcon from '@material-ui/icons/NavigateBefore'

import { NotesContext, NoteBarContext } from '../contexts'
import SideBarItems from './side_bar_items'
import NoteBar from './note_bar'

import useStyles from './styles'

const SidePanel = ({ sidePanelOpen, toggleSidePanel, baseEntities }) => {
  const [showNotes, setShowNotes] = useState(false)
  const [showNoteBar, setShowNoteBar] = useState(false)

  const classes = useStyles({ sidePanelOpen })

  return (
    <div className={classes.root}>
      <NotesContext.Provider value={{ showNotes, setShowNotes }}>
        <NoteBarContext.Provider value={{ showNoteBar, setShowNoteBar }}>
          <Drawer
            variant="permanent"
            anchor="right"
            className={classes.drawer}
            classes={{ paper: classes.drawerPaper }}
            onClose={toggleSidePanel}
            ModalProps={{ keepMounted: true }}
          >
            {showNoteBar && (
              <NoteBar
                sidePanelOpen={sidePanelOpen}
                toggleSidePanel={toggleSidePanel}
                baseEntities={baseEntities}
              />
            )}
            <Col justify="space-between" alignItems="flex-start">
              <SideBarItems />
              <div onClick={toggleSidePanel} className={classes.iconButton}>
                {sidePanelOpen ? <NextIcon color="inherit" /> : <CloseIcon color="inherit" />}
              </div>
            </Col>
          </Drawer>
        </NoteBarContext.Provider>
      </NotesContext.Provider>
    </div>
  )
}

export default SidePanel
