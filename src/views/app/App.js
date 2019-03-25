import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import dlv from 'dlv';
import Routing from '../routing';
import AuthenticatedApp from './authenticated';
import LayoutEditor from './layout-editor';
import TestDisplay from './test-display';
import { location } from '../../utils';

class App extends Component {
  constructor( props ) {
    super( props );

    if ( window ) {
      window.App = this;
    }
  }

  state = {
    layoutEditorOpen: false,
    debug: false,
  };

  componentDidMount() {
    if ( BackHandler )
      BackHandler.addEventListener( 'hardwareBackPress', this.handleBackPress );
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
    if ( BackHandler )
      BackHandler.removeEventListener( 'hardwareBackPress', this.handleBackPress );
  }

  openLayoutEditor() {
    this.setState({ layoutEditorOpen: true });
  }

  showDebugView() {
    this.setState({ debug: true });
  }

  handleBackPress = () => {
    const currentLocation = location.getBasePath();

    const exitableRoutes = [
      '/home',
      '/splash',
    ];

    const exitOnBack = exitableRoutes.includes( currentLocation );

    if ( exitOnBack ) {
      BackHandler.exitApp();

      return true;
    }

    location.goBack();

    return true;
  };

  render() {
    const { layoutEditorOpen, debug } = this.state;

    return (
      <AuthenticatedApp>
        { debug && <TestDisplay /> }
        { !layoutEditorOpen && <Routing /> }
        { layoutEditorOpen && <LayoutEditor /> }
      </AuthenticatedApp>
    );
  }
}

export default App;
