import { makeStyles } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  card: {
    cursor: 'pointer',
    backgroundColor: ({ selected }) => (selected ? blue[200] : theme.palette.background.paper),
    borderTopLeftRadius: ({ first }) => (first ? theme.spacing(1) : 0),
    borderTopRightRadius: ({ first }) => (first ? theme.spacing(1) : 0),
    borderBottomLeftRadius: ({ last }) => (last ? theme.spacing(1) : 0),
    borderBottomRightRadius: ({ last }) => (last ? theme.spacing(1) : 0),
    borderTopWidth: ({ first }) => (first ? theme.spacing(0.1) : 0),
    borderTopColor: theme.palette.grey[300],
    borderTopStyle: 'solid',
    borderBottomWidth: theme.spacing(0.1),
    borderBottomColor: theme.palette.grey[300],
    borderBottomStyle: 'solid',
    '&:hover': {
      backgroundColor: blue[50],
    },
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(0.1),
  },
}))

export default useStyles
