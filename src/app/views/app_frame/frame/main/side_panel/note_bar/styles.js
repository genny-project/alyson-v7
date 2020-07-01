import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  topBar: {
    margin: theme.spacing(1),
  },
  loadingBarSpot: {
    height: theme.spacing(1),
  },
  title: {
    paddingLeft: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(4),
  },
}))

export default useStyles
