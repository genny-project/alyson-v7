import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  lane: {
    backgroundColor: theme.palette.grey[100],
    height: '100%',
    borderRadius: theme.spacing(0.5),
    width: ({ expand }) => theme.spacing(expand ? 40 : 18),
    transition: theme.transitions.create(['width']),
    overflowY: 'scroll',
  },
}))

export default useStyles
