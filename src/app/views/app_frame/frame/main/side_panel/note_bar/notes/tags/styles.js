import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  tagInfo: {
    padding: '2rem',
    paddingLeft: '0.5rem',
  },
  small: {
    width: theme.spacing(7),
    height: theme.spacing(3),
    marginLeft: '1rem'
  },
}))

export default useStyles
