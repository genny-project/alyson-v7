import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  itemsColumn: {
    maxWidth: theme.spacing(30),
  },
  detailColumn: {
    width: ({ anySelected }) => (anySelected ? theme.spacing(70) : theme.spacing(0)),
    overflow: 'hidden',
    transition: theme.transitions.create(['width']),
  },
  mapColumn: {
    width: ({ anySelected }) => (anySelected ? theme.spacing(40) : theme.spacing(40)),
    transition: theme.transitions.create(['width']),
  },
}))

export default useStyles
