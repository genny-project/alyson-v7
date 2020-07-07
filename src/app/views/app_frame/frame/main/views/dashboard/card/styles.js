import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '6px 16px',
  },
  green: {
    backgroundColor: theme.palette.success.main,
  },
  orange: {
    backgroundColor: theme.palette.warning.dark,
  },
  grey: {
    backgroundColor: theme.palette.grey[500],
  },
  greenCheck: {
    color: theme.palette.success.main,
  },
  greyCheck: {
    color: theme.palette.grey[500],
  },
  iconColor: {
    color: ({isComplete, isOngoing, isNotStarted}) => isComplete ? theme.palette.success.main : isOngoing ? theme.palette.warning.dark : theme.palette.grey[500]}
}))

export default useStyles
