import { makeStyles } from '@material-ui/core'

import { DRAWER_WIDTH, APP_BAR_HEIGHT } from '../side_bar/styles'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: APP_BAR_HEIGHT,
    marginLeft: DRAWER_WIDTH,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      paddingTop: theme.spacing(1),
      height: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
    },
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    overflowY: 'scroll',
  },
  mainPaper: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
  },
  loadingContainer: {
    marginTop: theme.spacing(10),
    width: '100%',
  },
}))

export default useStyles
