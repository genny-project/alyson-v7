import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  itemRoot: {
    width: theme.spacing(30),
    cursor: 'pointer',
    borderLeft: '4px solid',
    borderLeftColor: ({ statusColor }) => `${statusColor}`,
    '&:hover': {
      backgroundColor: theme.palette.grey[50],
    },
    cardContent: {
      width: theme.spacing(20),
    },
  },
}));

export default useStyles;
