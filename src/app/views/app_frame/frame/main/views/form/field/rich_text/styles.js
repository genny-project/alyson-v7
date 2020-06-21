import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
  richTextContainer: {
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: '5px',
    padding: theme.spacing( 1 ),
  },
  labelText: {
    padding: theme.spacing( 1 ),
  },
}));

export default useStyles;
