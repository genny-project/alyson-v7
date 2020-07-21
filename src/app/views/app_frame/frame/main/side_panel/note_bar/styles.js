import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  topBar: {
    marginLeft: theme.spacing(0.5),
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
