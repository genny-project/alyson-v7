import React from 'react'
import { Drawer, Container, Fab, Tooltip } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIosRounded'
import useStyles from './styles'
import SidePanelContext from '../contexts/sidePanel'
import SideBarItems from './items'

const SidePanel = () => {
  const classes = useStyles()
  const { sidePanelOpen, toggleSidePanel } = React.useContext( SidePanelContext )

  return (
    <Drawer
      variant="temporary"
      anchor="right"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
      open={sidePanelOpen}
      onClose={toggleSidePanel}
      ModalProps={{ keepMounted: true }}
    >
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
    </Drawer>
  );
};

export default SidePanel;
