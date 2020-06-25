import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(( theme ) => ({
  root: {
    alignItems: 'center',
  },
  card: {
    width: 345,
    margin: theme.spacing( 1 ),
  },
  button: {
    width: 300,
    justifyContent: 'flex-start',
    borderRadius: 30,
    padding: theme.spacing( 2 ),
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
    marginLeft: theme.spacing( 1 ),
    marginBottom: theme.spacing( 2 )
  },
}))

export default useStyles
