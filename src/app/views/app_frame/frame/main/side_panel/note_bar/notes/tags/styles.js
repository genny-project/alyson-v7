import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  tagInfo: {
    padding: '1rem',
    paddingLeft: '0.5rem',
  },
  small: {
    width: theme.spacing(7),
    maxWidth: theme.spacing(7),
    height: theme.spacing(3),
  },
  rounded: {
    color: '#fff',
  },
}))

export default useStyles
