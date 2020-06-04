import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
  formRoot: {
    padding: theme.spacing( 1 ),
    flexGrow: 1,
  },
  formItem: {
    width: '50%',
    [theme.breakpoints.down( 'xs' )]: {
      width: '100%',
    },
  },
}));

export default useStyles;
