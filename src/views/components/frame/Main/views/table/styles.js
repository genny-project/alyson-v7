import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  button: {
    '&:hover': {
      color: theme.palette.primary.light,
    },
    cursor: 'pointer',
  },
  moreIcon: {
    padding: theme.spacing(2),
  },
}))

export default useStyles
