import React, { useContext, useState } from 'react'

import { Drawer, IconButton, Tooltip, Grid } from '@material-ui/core'

import NextIcon from '@material-ui/icons/NavigateNext'
import CloseIcon from '@material-ui/icons/NavigateBefore'

import { SidePanelContext, NotesContext, NoteBarContext } from '../contexts'
import SideBarItems from './items'
import NoteBar from './note_bar'

import useStyles from './styles'

const SidePanel = ({ sidePanelOpen, toggleSidePanel }) => {

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
            {showNoteBar && <NoteBar sidePanelOpen={sidePanelOpen}  toggleSidePanel={toggleSidePanel}/>}
            <div>
              <SideBarItems />
              <div className={classes.grow} />
              <Grid container justify="center" alignItems="center">
                <Tooltip title="Hide side panel" placement="top-start">
                  <IconButton onClick={toggleSidePanel}>
                    {sidePanelOpen ? <NextIcon color="inherit" /> : <CloseIcon color="inherit" />}
                  </IconButton>
                </Tooltip>
              </Grid>
            </div>
          </Drawer>
        </NoteBarContext.Provider>
      </NotesContext.Provider>
    </div>
  )
}

export default SidePanel
