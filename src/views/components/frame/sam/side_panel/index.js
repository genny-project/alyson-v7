import React from 'react'
import { Drawer, Fab, Tooltip, Grid } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIosRounded'
import useStyles from './styles'
import { SidePanelContext, NotesContext, NoteBarContext } from '../contexts'
import SideBarItems from './items'
import NoteBar from './note_bar'

const SidePanel = () => {
  const classes = useStyles()
  const { sidePanelOpen, toggleSidePanel } = React.useContext( SidePanelContext )
  const [showNotes, setShowNotes] = React.useState( false )
  const [showNoteBar, setShowNoteBar] = React.useState( false )

  return (
    <div
      className={classes.root}
    >
      <NotesContext.Provider value={{ showNotes, setShowNotes }}>
        <NoteBarContext.Provider value={{ showNoteBar, setShowNoteBar }}>
          <Drawer
            variant="temporary"
            anchor="right"
            className={classes.drawer}
            classes={{ paper: classes.drawerPaper }}
            open={sidePanelOpen}
            onClose={toggleSidePanel}
            ModalProps={{ keepMounted: true }}
          >
            { showNoteBar && ( <NoteBar /> ) }
            <div>
              <SideBarItems />
              <div className={classes.grow} />
              <Grid
                container
                justify="center"
                alignItems="center"
              >
                <Tooltip
                  title="Hide side panel"
                  placement="top-start"
                >
                  <Fab
                    color="primary"
                    onClick={toggleSidePanel}
                    className={classes.fab}
                    size="small"
                  >
                    <ArrowForwardIosIcon color="inherit" />
                  </Fab>
                </Tooltip>
              </Grid>
            </div>
          </Drawer>
        </NoteBarContext.Provider>
      </NotesContext.Provider>
    </div>
  );
};

export default SidePanel;
