import React from 'react'
import { Drawer, Tooltip, Grid, IconButton, Typography, Divider } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles'
import { SidePanelContext, NoteBarContext } from '../contexts'
import Notes from '../components/notes'

const NoteBar = () => {
  const classes = useStyles()
  const { sidePanelOpen, toggleSidePanel } = React.useContext( SidePanelContext )
  const { setShowNoteBar } = React.useContext( NoteBarContext )

  return (
    <div
      className={classes.root}
    >
      <Drawer
        variant="temporary"
        anchor="right"
        className={classes.drawerLeft}
        classes={{ paper: classes.drawerPaperLeft }}
        open={sidePanelOpen}
        onClose={toggleSidePanel}
        ModalProps={{ keepMounted: true }}
      >
        <div>
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
                  onClick={() => setShowNoteBar( false )}
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
        </div>
      </Drawer>
    </div>
  );
};

export default NoteBar;
