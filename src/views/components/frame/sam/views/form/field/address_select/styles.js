import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
  inputField: {
    width: '100%',
  },
  icon: {
    color: theme.palette.text.secondary,
    [theme.breakpoints.down( 'xs' )]: {
      width: '100%',
    },
  },
  iconGrid: {
    width: '100%',
  },
}));

export default useStyles;
