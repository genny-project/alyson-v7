import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflowX: 'scroll',
    height: '100%',
  },
  lane: {
    backgroundColor: theme.palette.grey[100],
    height: '100%',
    borderRadius: theme.spacing(0.5),
    width: theme.spacing(30),
    overflowY: 'scroll',
  },
}));

export default useStyles;
