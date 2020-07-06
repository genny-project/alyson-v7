import { pathOr } from 'ramda'
import { createMuiTheme } from '@material-ui/core'

import getProjectKey from './get-project-key'

const makeTheme = ({ attributes, asks }) =>
  createMuiTheme({
    palette: {
      primary: {
        main: pathOr('#2196f3', [getProjectKey(asks), 'PRI_COLOR_PRIMARY', 'value'], attributes),
      },
    },
  })

export default makeTheme
