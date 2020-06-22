import { makeStyles } from '@material-ui/core'
import { indigo, deepPurple, cyan, deepOrange } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
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
    backgroundColor: indigo[900],
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
  active: {
    borderRadius: theme.spacing(1),
    background: `linear-gradient(90deg, ${deepPurple[300]} 30%, ${deepPurple[600]} 90%)`,
    color: theme.palette.background.default,
  },
  placed: {
    borderRadius: theme.spacing(1),
    background: `linear-gradient(90deg, ${cyan[300]} 30%, ${cyan[600]} 90%)`,
    color: theme.palette.background.default,
  },
  progress: {
    borderRadius: theme.spacing(1),
    background: `linear-gradient(90deg, ${deepOrange[300]} 30%, ${deepOrange[600]} 90%)`,
    color: theme.palette.background.default,
  },
  fullWidth: {
    width: '100%',
  },
  textButton: {
    cursor: 'pointer',
  },
}))

export default useStyles
