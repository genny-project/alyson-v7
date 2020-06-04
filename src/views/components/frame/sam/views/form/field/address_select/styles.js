import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
  inputField: {
    width: '100%',
  },
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing( 2 ),
  },
}));

export default useStyles;
