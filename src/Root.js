import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import App from './app'
import { VertxProvider, GoogleProvider } from './app/views/app_frame'
import { store } from './redux'

if (typeof window !== 'undefined') {
  window.store = store
}

const Root = () => (
  <ReduxProvider store={store}>
    <VertxProvider>
      <GoogleProvider>
        <App />
      </GoogleProvider>
    </VertxProvider>
  </ReduxProvider>
)

export default Root
