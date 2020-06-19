import { makeStyles } from '@material-ui/core';

const DRAWER_WIDTH = 180 * 2;
const APP_BAR_HEIGHT = 64;

const useStyles = makeStyles( theme => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    overflowY: 'scroll',
    padding: theme.spacing( 1 ),
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    marginTop: `${theme.spacing( 10 )}px auto`,
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
}));

export default useStyles;
export { DRAWER_WIDTH, APP_BAR_HEIGHT };
