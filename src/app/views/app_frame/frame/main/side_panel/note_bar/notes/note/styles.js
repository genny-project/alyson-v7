import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
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
  card: {},
}))

export default useStyles
