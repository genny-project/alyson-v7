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
    width: '100%',
  },
  menu: {
    maxHeight: theme.spacing( 30 ),
  },
}));

export default useStyles;
