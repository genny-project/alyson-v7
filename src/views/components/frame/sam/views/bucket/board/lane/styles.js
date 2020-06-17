import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  lane: {
    backgroundColor: theme.palette.grey[100],
    height: '100%',
    borderRadius: theme.spacing(0.5),
<<<<<<< HEAD
    width: ({ expand }) => theme.spacing(expand ? 40 : 20),
=======
    width: ({ expand }) => theme.spacing(expand ? 40 : 12),
>>>>>>> v3.1.0
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowY: 'scroll',
  },
}))

export default useStyles
