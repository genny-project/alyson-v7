import { makeStyles } from '@material-ui/core';

const DRAWER_WIDTH = 60;
const APP_BAR_HEIGHT = 64;

const useStyles = makeStyles( theme => ({
  drawer: {
    width: DRAWER_WIDTH,
    overflowY: 'scroll',
    padding: theme.spacing( 1 ),
  },
  drawerLeft: {
    width: 360,
    overflowY: 'scroll',
    padding: theme.spacing( 1 ),
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    marginTop: 64,
  },
  drawerPaperLeft: {
    width: 360,
  },
  grow: {
    flexGrow: 1,
  },
  footer: {
    margin: theme.spacing( 1 ),
  },
  topBar: {
    margin: theme.spacing( 2 ),
    maxWidth: 345,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing( 4 ),
  },
}));

export default useStyles;
export { DRAWER_WIDTH, APP_BAR_HEIGHT };
