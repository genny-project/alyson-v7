import { makeStyles } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  itemRoot: {
    width: theme.spacing(35),
    cursor: 'pointer',
    borderLeft: '4px solid',
    borderLeftColor: ({ statusColor }) => `${statusColor || blueGrey[100]}`,
    '&:hover': {
      backgroundColor: theme.palette.grey[50],
    },
  },
  profilePicture: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
}));

export default useStyles;
