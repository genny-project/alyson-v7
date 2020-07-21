import { makeStyles } from '@material-ui/core'
import { amber, grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  tagInfo: {
    padding: '1rem',
  },
  small: {
    width: theme.spacing(7),
    height: theme.spacing(3),
    marginLeft: '0.7rem',
    color: '#fff',
    backgroundColor: amber[500]
  },
  chip:{
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  }
}))

export default useStyles
