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
  topBar: {
    backgroundColor: theme.palette.primary.dark,
    borderRadius: theme.spacing(1),
    color: theme.palette.background.default,
    marginBottom: theme.spacing(2),
  },
  divider: {
    backgroundColor: theme.palette.background.default,
    height: theme.spacing(9),
    marginTop: `-${theme.spacing(3)}px`,
    marginBottom: `-${theme.spacing(3)}px`,
  },
  tile: {
    borderRadius: theme.spacing(1),
    color: theme.palette.primary.light,
  },
  fullWidth: {
    width: '100%',
  },
  textButton: {
    cursor: 'pointer',
  },
}))

export default useStyles
