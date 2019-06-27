import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import queryString from 'query-string';
import AuthenticatedApp from './authenticated';
import Routing from '../routing';
import { location } from '../../utils';
import { DebugDisplay } from '../components';

class App extends Component {
  constructor( props ) {
    super( props );

    if ( window ) {
      window.App = this;
    }
  }

  componentDidMount() {
    if ( BackHandler ) BackHandler.addEventListener( 'hardwareBackPress', this.handleBackPress );
  }

  componentWillUnmount() {
    if ( BackHandler ) BackHandler.removeEventListener( 'hardwareBackPress', this.handleBackPress );
  }

  /* This is a small expandable screen underneath the project contents */

  getDisplayDevMode() {
    /* check for query String Values */
    if ( window ) {
      const paramsFromWindow = window.location.search;
      const values = queryString.parse( paramsFromWindow );

      if ( values && ( values.debug === 'true' || values.devmode === 'true' || values.devMode === 'true' )) {
        localStorage.setItem( 'DEV_MODE', true ); // sync the values with local storage
      }

      if ( values && (( !values.debug && !values.devmode && !values.devMode ) || values.debug === 'false' || values.devMode === 'false' || values.devMode === 'false' )) {
        localStorage.setItem( 'DEV_MODE', false ); // sync the values with local storage
      }
      console.warn({ values }); // eslint-disable-line
    }

    /* Check in local Storgae */

    const devMode = localStorage.getItem( 'DEV_MODE' );

    if ( devMode === 'true' ) return <DebugDisplay />;

    return null;
  }

  handleBackPress = () => {
    const currentLocation = location.getBasePath();

    const exitableRoutes = ['/home', '/splash'];

    const exitOnBack = exitableRoutes.includes( currentLocation );

    if ( exitOnBack ) {
      BackHandler.exitApp();

      return true;
    }

    location.goBack();

    return true;
  };

  render() {
    return (
      <AuthenticatedApp>
        <Routing />
        {this.getDisplayDevMode()}
      </AuthenticatedApp>
    );
  }
}

export default App;
