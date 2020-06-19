import React from 'react'
import { Drawer, Container, Fab, Tooltip, Grid, IconButton, Typography, Divider } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIosRounded'
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles'
import { SidePanelContext, NotesContext } from '../contexts'
import SideBarItems from './items'
import Notes from '../components/notes'

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
          ? (
            <React.Fragment>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                className={classes.topBar}
              >
                <Grid>
                  <Typography>
                Add Note
                  </Typography>
                </Grid>
                <div className={classes.grow} />
                <Grid>
                  <Tooltip
                    title="search"
                    placement="top-start"
                  >
                    <IconButton
                      color="primary"
                    >
                      <SearchIcon color="inherit" />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid>
                  <Tooltip
                    title="close notes"
                    placement="top-start"
                  >
                    <IconButton
                      color="primary"
                      onClick={() => setShowNotes( false )}
                    >
                      <ClearIcon color="inherit" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
              <Divider />
              <Grid>
                <Notes />
              </Grid>

            </React.Fragment>
          ) : (
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
