import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import queryString from 'query-string';
import dlv from 'dlv';
import AuthenticatedApp from './authenticated';
import Routing from '../routing';
import store from '../../redux/store';
import { location, setTitle } from '../../utils';
import { DebugDisplay, Favicon, Fragment, Chess, List, DragDrop } from '../components';

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
      // console.warn({ values }); // eslint-disable-line
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
    const { keycloak } = store.getState();
    const projectName = dlv( keycloak, 'data.PRI_NAME' );

    setTitle( projectName );

    return (
      <div
        style={{
          overflow: 'auto',
          height: '100%',
          width: '100%',
          padding: '40px',
        }}
      >
        <h1>
          Drag and Drop Tests
        </h1>
        {/* <h3>
          Generic Drag and Drop Component
        </h3>
        <DragDrop
          code="CODE_1"
          content="Bananas are among the most important {{BOX}} crops on the planet. They come from a family of plants called Musa that are native to {{BOX}} and grown in many of the {{BOX}} areas of the world."
          items={[
            {
              id: 1,
              name: 'food',
            },
            {
              id: 2,
              name: 'yellow',
            },
            {
              id: 3,
              name: 'Southeast Asia',
            },
            {
              id: 4,
              name: 'Australia',
            },
            {
              id: 5,
              name: 'South America',
            },
            {
              id: 6,
              name: 'warmer',
            },
            {
              id: 6,
              name: 'driest',
            },
          ]}
        />
        <div style={{ padding: '10px' }} /> */}
        <h3>
          List
        </h3>
        <List
          code="CODE_2"
          items={
            [
              {
                id: 1,
                text: 'Write a cool JS library',
              },
              {
                id: 2,
                text: 'Make it generic enough',
              },
              {
                id: 3,
                text: 'Write README',
              },
              {
                id: 4,
                text: 'Create some examples',
              },
              {
                id: 5,
                text:
                  'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
              },
              {
                id: 6,
                text: '???',
              },
              {
                id: 7,
                text: 'PROFIT',
              },
            ]
          }
        />
        <div style={{ padding: '10px' }} />
        <h3>
          Fill
        </h3>
        <DragDrop
          bumpItems
          onChange={( e ) => console.log( 'handleChange', e )}
          code="CODE_3"
          content="Bananas are among the most important {{BOX}} crops on the planet. They come from a family of plants called Musa that are native to {{BOX}} and grown in many of the {{BOX}} areas of the world."
          items={[
            {
              id: 1,
              name: 'food',
            },
            {
              id: 2,
              name: 'yellow',
            },
            {
              id: 3,
              name: 'Southeast Asia',
            },
            {
              id: 4,
              name: 'Australia',
            },
            {
              id: 5,
              name: 'South America',
            },
            {
              id: 6,
              name: 'warmer',
            },
            {
              id: 6,
              name: 'driest',
            },
          ]}
        />
        <div style={{ padding: '10px' }} />
        <h3>
          Match
        </h3>
        <DragDrop
          onChange={( e ) => console.log( 'handleChange', e )}
          code="CODE_4"
          // content="Bananas are among the most important {{BOX}} crops on the planet. They come from a family of plants called Musa that are native to {{BOX}} and grown in many of the {{BOX}} areas of the world."
          groups={[
            {
              id: 1,
              name: 'Red',
            },
            {
              id: 2,
              name: 'Orange',
            },
            {
              id: 3,
              name: 'Yellow',
            },
            {
              id: 4,
              name: 'Green',
            },
          ]}
          items={[
            {
              id: 1,
              name: 'Apple',
            },
            {
              id: 2,
              name: 'Banana',
            },
            {
              id: 3,
              name: 'Orange',
            },
            {
              id: 4,
              name: 'Pear',
            },
          ]}
        />
        {/* <div style={{ padding: '10px' }} />
        <Chess /> */}
      </div>
    );

    // return (
    //   <AuthenticatedApp>
    //     <Routing />
    //     <Favicon />
    //     {this.getDisplayDevMode()}
    //   </AuthenticatedApp>
    // );
  }
}

export default App;
