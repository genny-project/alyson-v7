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
  notesSection: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    maxHeight: '45vh',
    marginBottom: theme.spacing(3),
    flexWrap: 'noWrap',
  },
  notesContainer: {
    padding: theme.spacing(1),
  },
  inputBase:{
    margin: theme.spacing(1)
  },
  divider: {
    width: '90%',
    marginLeft: theme.spacing(2.5)
  },
  charactersLeft: {
    marginLeft: theme.spacing(2.5)
  }
}))

export default useStyles
