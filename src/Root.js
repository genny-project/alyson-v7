/* eslint-disable import/first */
import 'nprogress/nprogress.css'
import './polyfills'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './views/app'
import { VertxProvider, GoogleProvider } from './views/components'
import { store, persistor } from './redux'
import './utils/layouts-dev'

if (typeof window !== 'undefined') {
  window.store = store
}

const Root = () => (
  <ReduxProvider store={store}>
    <PersistGate persistor={persistor}>
      <VertxProvider>
        <GoogleProvider>
          <App />
        </GoogleProvider>
      </VertxProvider>
    </PersistGate>
  </ReduxProvider>
)

export default Root
