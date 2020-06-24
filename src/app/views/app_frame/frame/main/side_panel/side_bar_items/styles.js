import { makeStyles } from '@material-ui/core'
import { blue, amber } from '@material-ui/core/colors'
const useStyles = makeStyles(theme => ({
  items: {
    marginBottom: theme.spacing(4),
  },
  blueIcon: {
    color: blue[300],
  },
  yellowIcon: {
    color: amber[300],
  },
  itemsContainer: {
    padding: theme.spacing(1),
  },
}))

export default useStyles
