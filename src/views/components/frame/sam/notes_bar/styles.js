import { makeStyles } from '@material-ui/core';

const DRAWER_WIDTH = 180;
const APP_BAR_HEIGHT = 64;

const useStyles = makeStyles( theme => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  grow: {
    flexGrow: 1,
  },
  header: {
    paddingTop: theme.spacing( 1 ),
  },
  footer: {
    marginBottom: theme.spacing( 1 ),
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default useStyles;
export { DRAWER_WIDTH, APP_BAR_HEIGHT };
