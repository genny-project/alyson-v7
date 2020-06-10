import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
  nested: {
    paddingLeft: theme.spacing( 4 ),
  },
  listItem: {
    borderRadius: '3px',
  },
}));

export default useStyles;
