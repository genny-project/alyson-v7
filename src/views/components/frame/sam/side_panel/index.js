import React from 'react'
import { Drawer, Container, Fab, Tooltip } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIosRounded'
import useStyles from './styles'
import SidePanelContext from '../contexts/sidePanel'
import SideBarItems from './items'
import Notes from '../components/notes'
import NotesContext from '../contexts/note'

const SidePanel = () => {
  const classes = useStyles()
  const { sidePanelOpen, toggleSidePanel } = React.useContext( SidePanelContext )
  const [showNotes, setShowNotes] = React.useState( false )

  return (
    <NotesContext.Provider value={{ showNotes, setShowNotes }}>
      <Drawer
        variant="temporary"
        anchor="right"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        open={sidePanelOpen}
        onClose={toggleSidePanel}
        ModalProps={{ keepMounted: true }}
      >
        {showNotes
          ?
            <Notes />
          : (
            <React.Fragment>
              <SideBarItems />
              <div className={classes.grow} />
              <Container className={classes.footer}>
                <Tooltip
                  title="Hide side panel"
                  placement="top-start"
                >
                  <Fab
                    color="primary"
                    onClick={toggleSidePanel}
                  >
                    <ArrowForwardIosIcon color="inherit" />
                  </Fab>
                </Tooltip>
              </Container>
            </React.Fragment>
          )}

      </Drawer>
    </NotesContext.Provider>
  );
};

export default SidePanel;
