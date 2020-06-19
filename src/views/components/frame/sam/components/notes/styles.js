import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(( theme ) => ({
  root: {
    alignItems: 'center',
  },
  card: {
    maxWidth: 345,
    marginBottom: theme.spacing( 2 ),
  },
  button: {
    maxWidth: 345,
    justifyContent: 'flex-start',
  },
  media: {
    height: 140,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing( 2 ),
  },
  buttonControl: {
    margin: theme.spacing( 2 ),
  },
  expand: {
    marginLeft: 'auto',
  },
}))

export default useStyles
