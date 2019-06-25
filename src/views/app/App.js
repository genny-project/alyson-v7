import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import dlv from 'dlv';
import queryString from 'query-string';
import AuthenticatedApp from './authenticated';
import TestDisplay from './test-display';
import Routing from '../routing';
import { location } from '../../utils';
import { DebugDisplay } from '../components';
import { Storage } from '../../utils';

console.log({ Storage });

class App extends Component {
  constructor( props ) {
    super( props );

    if ( window ) {
      window.App = this;
    }
  }

  state = {
    debug: false,
  };

  componentDidMount() {
    if ( BackHandler ) BackHandler.addEventListener( 'hardwareBackPress', this.handleBackPress );
  }

  componentDidUpdate() {
    const queryParams = location.getQueryParams();

    if ( window ) {
      window.originalQueryParams = {
        ...( window.originalQueryParams ? window.originalQueryParams : {}),
        ...queryParams,
      };
    }

    if ( !this.state.debug && dlv( window, 'originalQueryParams.showcodes' )) {
      this.showDebugView();
    }
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

      if ( values && values.devMode === 'true' ) {
        localStorage.setItem( 'DEV_MODE', true ); // sync the values with local storage
      }

      if ( values && values.devMode === 'false' ) {
        localStorage.setItem( 'DEV_MODE', false ); // sync the values with local storage
      }
      console.warn({ values }); // eslint-disable-line
    }

    /* Check in local Storgae */

    const devMode = localStorage.getItem( 'DEV_MODE' );

    if ( devMode === 'true' ) return <DebugDisplay />;

    return null;
  }

  showDebugView() {
    this.setState({ debug: true });
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
    const { debug } = this.state;

    return (
      <AuthenticatedApp>
        {debug && <TestDisplay />}
        <Routing />

        {this.getDisplayDevMode()}
      </AuthenticatedApp>
    );
  }
}

export default App;
