import React, { useState, useEffect } from 'react'

import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { Drawer, Snackbar, Button, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Col, Row } from '../components/layouts'

import SideBarItems from './side_bar_items'
import NoteBar from './note_bar'
import PanelControl from './panel_control'
import useStyles from './styles'

const SidePanel = ({
  sidePanelOpen,
  toggleSidePanel,
  baseEntities,
  attributes,
  setSidePanelOpen,
  currentNote,
}) => {
  const [showNotes, setShowNotes] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [lastNote, setLastNote] = useState(currentNote)

  const classes = useStyles({ sidePanelOpen, showNotes })

  const handleClickAway = () => setSidePanelOpen(false)

  useEffect(
    () => {
      if (!sidePanelOpen && showNotes) setShowNotes(false)
    },
    [sidePanelOpen],
  )

  useEffect(
    () => {
      if (currentNote.id !== lastNote.id) {
        setOpenSnackbar(true)
        setLastNote(currentNote)
      }
    },
    [currentNote],
  )

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          anchor="right"
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
        >
          {showNotes ? (
            <NoteBar
              sidePanelOpen={sidePanelOpen}
              toggleSidePanel={toggleSidePanel}
              setShowNotes={setShowNotes}
              baseEntities={baseEntities}
              attributes={attributes}
              currentNote={currentNote}
            />
          ) : (
            <Col justify="space-between" alignItems="flex-start">
              <SideBarItems setShowNotes={setShowNotes} />
            </Col>
          )}
        </Drawer>
        <PanelControl toggleSidePanel={toggleSidePanel} sidePanelOpen={sidePanelOpen} />
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="info">
            <Row>
              <Typography color="inherit">{`${currentNote.content || ''}`}</Typography>
              <Button
                onClick={() => {
                  setSidePanelOpen(true)
                  setShowNotes(true)
                }}
              >{`Go to note`}</Button>
            </Row>
          </Alert>
        </Snackbar>
      </div>
    </ClickAwayListener>
  )
}

export default SidePanel
