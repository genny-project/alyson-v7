import { makeStyles } from '@material-ui/core';

import { DRAWER_WIDTH, APP_BAR_HEIGHT } from '../side_bar/styles';

const useStyles = makeStyles( theme => ({
  root: {
    marginTop: APP_BAR_HEIGHT,
    marginLeft: theme.breakpoints.down( 'xs' ) ? 0 : DRAWER_WIDTH,
    padding: theme.spacing( 3 ),
    backgroundColor: theme.palette.background.default,
    height: `calc(100vh - ${APP_BAR_HEIGHT * 2}px)`,
    paddingBottom: APP_BAR_HEIGHT,
    overflowY: 'scroll',
  },
  mainPaper: {
    marginBottom: theme.spacing( 1 ),
    padding: theme.spacing( 2 ),
  },
}));

export default useStyles;
