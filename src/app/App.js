import React from 'react'
import AuthenticatedApp from './authenticated'
import Routing from './routing'
import { CssBaseline } from '@material-ui/core'

const App = () => (
  <AuthenticatedApp>
    <CssBaseline />
    <Routing />
  </AuthenticatedApp>
)

export default App
