import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing( 0.5 ),
  },
  select: {
    minWidth: theme.spacing( 50 ),
  },
}));

export default useStyles;
