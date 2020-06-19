import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(( theme ) => ({
  root: {
    alignItems: 'center',
  },
  card: {
    maxWidth: 345,
    margin: theme.spacing( 1 ),
  },
  media: {
    height: 140,
  },
  button: {
    margin: theme.spacing( 1 ),
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing( 2 ),
    margin: theme.spacing( 1 ),
  },
  expand: {
    marginLeft: 'auto',
  },
}))

export default useStyles
