import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
  listItem: {
    borderRadius: '3px',
  },
  mainText: {
    fontWeight: 500,
  },
  secondaryText: {
    fontSize: '0.9rem',
    paddingLeft: theme.spacing( 1 ),
  },
}));

export default useStyles;
