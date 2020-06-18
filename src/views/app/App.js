import React from 'react'
import AuthenticatedApp from './authenticated'
import Routing from '../routing'

const App = () => (
  <AuthenticatedApp>
    <Routing />
  </AuthenticatedApp>
)

export default App
