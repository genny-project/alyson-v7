import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  drawerLeft: {
    width: 360,
    overflowY: 'scroll',
    padding: theme.spacing(1),
  },
  drawerPaperLeft: {
    width: 360,
  },
  grow: {
    flexGrow: 1,
  },
  topBar: {
    margin: theme.spacing(2),
    maxWidth: 345,
  },
}))

export default useStyles
