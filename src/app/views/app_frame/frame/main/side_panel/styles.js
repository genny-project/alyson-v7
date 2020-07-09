import { makeStyles } from '@material-ui/core'

const SIDEPANEL_WIDTH = 100
const MINI_SIDEPANEL_WIDTH = 0
const SIDEPANEL_NOTES_WIDTH = 500
import { APP_BAR_HEIGHT } from '../app_bar/styles'

const useStyles = makeStyles(theme => ({
  drawer: {
    overflowY: 'scroll',
    padding: theme.spacing(1),
  },
  drawerPaper: {
    width: ({ sidePanelOpen, showNotes }) =>
      sidePanelOpen ? (showNotes ? SIDEPANEL_NOTES_WIDTH : SIDEPANEL_WIDTH) : MINI_SIDEPANEL_WIDTH,
    marginTop: APP_BAR_HEIGHT,
    transition: theme.transitions.create('width'),
  },
  grow: {
    flexGrow: 1,
  },
  footer: {
    margin: theme.spacing(1),
  },
  topBar: {
    margin: theme.spacing(2),
    maxWidth: 345,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(4),
  },
  iconButton: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}))

export default useStyles
export { SIDEPANEL_WIDTH, MINI_SIDEPANEL_WIDTH }
