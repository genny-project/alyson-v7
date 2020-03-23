/* eslint-disable import/first */
import 'nprogress/nprogress.css';
import './polyfills';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './views/app';
import { VertxProvider, GoogleProvider, ErrorBoundary, ActivityIndicator, Box, Text } from './views/components';
import { store, persistor } from './redux';
import './utils/layouts-dev';

// const { store, persistor } = reduxStore();

console.disableYellowBox = true; // eslint-disable-line no-console

// /* ------------------------ */
// // if ( !this.f ) {
// //   this.f = true;
// //   global.LayoutsDev.load( 'internmatch-new' );
// }
// /* ------------------------ */

if ( typeof window !== 'undefined' ) {
  window.store = store;
}

const Root = () => (
  <ErrorBoundary>
    <ReduxProvider store={store}>
      <PersistGate
        loading={(
          <Box
            justifyContent="center"
            alignItems="center"
            flex={1}
            flexDirection="column"
            testID="page-loading"
          >
            <ActivityIndicator />
            <Text>
            Loading...
            </Text>
          </Box>
)}
        persistor={persistor}
      >
        <VertxProvider>
          <GoogleProvider>
            <App />
          </GoogleProvider>
        </VertxProvider>
      </PersistGate>
    </ReduxProvider>
  </ErrorBoundary>
);

export default Root;
