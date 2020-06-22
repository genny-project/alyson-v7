import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  button: {
    '&:hover': {
      color: theme.palette.primary.light,
    },
    cursor: 'pointer',
  },
  moreIcon: {
    marginLeft: theme.spacing(1),
  },
  footer: {
    margin: theme.spacing(1),
  },
}))

export default useStyles
