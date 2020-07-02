import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  expand: {
    transform: ({ expand }) => (expand ? 'rotate(180deg)' : 'rotate(0deg)'),
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  card: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(0.5),
  },
}))

export default useStyles
