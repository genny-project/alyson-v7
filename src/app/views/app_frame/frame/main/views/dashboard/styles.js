import { makeStyles } from '@material-ui/core'
import { indigo, deepPurple, cyan, deepOrange } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  welcomeText: {
    color: theme.palette.primary.dark,
  },
  loading: {
    marginTop: theme.spacing(10),
    width: '100%',
  },
  dashboardContainer: {
    padding: theme.spacing(6),
    width: '100%',
    marginLeft: theme.spacing(1.5),
  },
  divider: {
    backgroundColor: theme.palette.primary.dark,
    height: theme.spacing(9),
    marginTop: `-${theme.spacing(3)}px`,
    marginBottom: `-${theme.spacing(3)}px`,
  },
  tile: {
    borderRadius: theme.spacing(1),
    color: theme.palette.primary.light,
    cursor: 'pointer',
  },
  fullWidth: {
    width: '100%',
  },
}))

export default useStyles
