import { makeStyles } from '@material-ui/core'
import { DRAWER_WIDTH } from '../side_bar/styles'

const APP_BAR_HEIGHT = 64

const useStyles = makeStyles(theme => ({
  appBar: {
    marginLeft: DRAWER_WIDTH,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  grow: {
    flexGrow: 1,
  },
  loadingBar: {
    height: theme.spacing(0.2),
  },
}))

export default useStyles

export { APP_BAR_HEIGHT }
