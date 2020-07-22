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
    maxHeight: ({expanded}) => expanded ? '45vh' : '70vh',
    marginBottom: theme.spacing(3),
    flexWrap: 'noWrap',
  },
  notesContainer: {
    padding: theme.spacing(1),
  },
  inputBase:{
    margin: theme.spacing(1),
    color: ({noteContent}) => noteContent.length > 250 ? theme.palette.secondary.dark : '#000'
  },
  divider: {
    width: '90%',
    marginLeft: theme.spacing(2.5)
  },
  charactersLeft: {
    marginLeft: theme.spacing(2.5)
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}))

export default useStyles
