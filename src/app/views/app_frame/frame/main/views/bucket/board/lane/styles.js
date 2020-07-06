import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  lane: {
    backgroundColor: theme.palette.grey[100],
    height: '100%',
    borderRadius: theme.spacing(1),
    width: ({ expand }) => theme.spacing(expand ? 40 : 16),
    transition: theme.transitions.create(['width']),
  },
}))

export default useStyles
