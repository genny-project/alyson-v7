import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
  },
  media: {
    height: 140,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  notesContainer: {
    padding: theme.spacing(1),
  },
}))

export default useStyles
