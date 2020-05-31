import { makeStyles } from '@material-ui/core';

const DRAWER_WIDTH = 180;
const APP_BAR_HEIGHT = 64;

const useStyles = makeStyles( theme => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    overflowY: 'scroll',
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    overflowY: 'scroll',
  },
  title: {
    paddingTop: theme.spacing( 1 ),
    height: APP_BAR_HEIGHT,
  },
}));

export default useStyles;
export { DRAWER_WIDTH, APP_BAR_HEIGHT };
