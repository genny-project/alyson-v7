import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  green: {
    backgroundColor: theme.palette.success.main
  },
  orange: {
    backgroundColor: theme.palette.warning.dark
  },
  grey: {
    backgroundColor: theme.palette.grey[500]
  }
}))

export default useStyles
