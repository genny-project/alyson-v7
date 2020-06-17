import { makeStyles } from '@material-ui/core';

const DRAWER_WIDTH = 180;
const APP_BAR_HEIGHT = 64;

const useStyles = makeStyles( theme => ({
  header: {
    paddingTop: theme.spacing( 1 ),
  },
}));

export default useStyles;
export { DRAWER_WIDTH, APP_BAR_HEIGHT };
