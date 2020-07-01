import React, { useState, useEffect } from 'react'

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Drawer } from '@material-ui/core'

import { Col } from '../components/layouts'

import SideBarItems from './side_bar_items'
import NoteBar from './note_bar'
import PanelControl from './panel_control'
import useStyles from './styles'

const SidePanel = ({ sidePanelOpen, toggleSidePanel, baseEntities, attributes, setSidePanelOpen }) => {
  const [showNotes, setShowNotes] = useState(false)

  const classes = useStyles({ sidePanelOpen, showNotes })

  const handleClickAway = () => setSidePanelOpen(false)

  useEffect(
    () => {
      if (!sidePanelOpen && showNotes) setShowNotes(false)
    },
    [sidePanelOpen],
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
            />
          ) : (
            <Col justify="space-between" alignItems="flex-start">
              <SideBarItems setShowNotes={setShowNotes} />
            </Col>
          )}
        </Drawer>
        <PanelControl toggleSidePanel={toggleSidePanel} sidePanelOpen={sidePanelOpen} />
      </div>
    </ClickAwayListener>
  )
}

export default SidePanel
