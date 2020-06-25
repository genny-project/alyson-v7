import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: 345,
    marginBottom: theme.spacing(1),
  },
  cardContainer: {
    margin: theme.spacing(1),
  },
  popper: {
    zIndex: theme.zIndex.modal + 10,
  },
  buttonGroup: {
    marginBottom: `-${theme.spacing(3)}px`,
    marginRight: `-${theme.spacing(10)}px`,
    boxShadow: 'none',
  },
  input: {
    fontSize: '0.88rem',
  },
  card: {
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  background:' #fff',
  borderRadius: 2,
  display: 'inline-block',
  marginLeft: theme.spacing(3),
  marginBottom: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  minWidth:200,
  maxWidth: 345
  }
}))

export default useStyles
