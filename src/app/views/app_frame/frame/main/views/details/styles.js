import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  detailsContainer: {
    padding: theme.spacing(2),
  },
  label: {
    fontWeight: 500,
    paddingRight: theme.spacing(4),
    width: theme.spacing(17.5),
  },
  miniContainer: {
    maxWidth: theme.spacing(60),
  },
}))

export default useStyles
