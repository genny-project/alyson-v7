import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  detailPaneContainer: {
    borderWidth: theme.spacing(0.1),
    borderStyle: 'solid',
    borderColor: theme.palette.grey[400],
    padding: theme.spacing(0.5),
    width: '100%',
  },
}))

export default useStyles
