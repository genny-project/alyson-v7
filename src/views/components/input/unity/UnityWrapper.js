/* eslint-disable react/prop-types */
import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import { Box, ActivityIndicator, Text } from '../../../components';
import { Bridge, isObject } from '../../../../utils';
import UnityProvider from './provider';

class UnityWrapper extends React.Component {
  constructor( props ) {
    super( props );
    this.unityContent = new UnityContent(
      // '/unity/unison_webgl_genny.json',

      // '/unity/unison_webgl.json',
      '/unity/safeTrafficTown.json',

      '/unity/UnityLoader.js'
    );

    this.unityContent.on( 'progress', progression => {
      this.setState({
        progression: progression,
      });
    });

    this.unityContent.on( 'loaded', () => {
      this.setState({
        isLoading: false,
      });
    });

    this.unityContent.on( 'unityEvent', ( data ) => {
      console.warn( 'unityEvent', { data }); // eslint-disable-line
      this.handleEvent( data );
    });

    this.unityContent.on( 'unityAnswer', ( data ) => {
      console.warn( 'unityAnswer', { data }); // eslint-disable-line
      this.handleChange( data );
    });
  }

  sceneContexts = {}

  state = {
    progression: null,
    currentSceneCode: null,
    isLoading: true,
  }

  updateScene = ( sceneContext ) => {
    // console.warn( 'updateScene', sceneContext, this.sceneContexts );

    const { questionCode, sceneCode } = sceneContext;

    const updatedSceneContexts = {
      ...this.sceneContexts,
    };

    // check if sceneContext questionCode is already stored
    if ( isObject( updatedSceneContexts, { withProperty: questionCode })) {
    // check if sceneContext sceneCode is same as stored value
      if ( updatedSceneContexts[questionCode].sceneCode !== sceneCode ) {
        // if different, update
        updatedSceneContexts[questionCode] = {
          ...sceneContext,
        };
      }
      else {
        // if same, no update
        // console.warn( 'no update' );

        return;
      }
    }
    else {
      // if not stored, update
      updatedSceneContexts[questionCode] = {
        ...sceneContext,
      };
    }

    // if only one sceneContext, then update currentSceneCode

    const shouldUpdateCurrentSceneCode = Object.keys( updatedSceneContexts ).length === 1;

    // console.warn( 'UPDATE STATE' );

    this.sceneContexts = updatedSceneContexts,

    this.setState( state => ({
      currentSceneCode: shouldUpdateCurrentSceneCode ? sceneCode : state.currentSceneCode,
    }), () => {
      // console.warn( 'UPDATE CALLBACK', this.state.currentSceneCode, updatedSceneContexts );

      this.sendEventToUnity( this.state.currentSceneCode );
    });
  }

  sendEventToUnity = ( SceneIndex ) => {
    // console.warn({ index: SceneIndex });
    this.unityContent.send(
      'Main Camera',
      'ChangeScene',
      SceneIndex
    );
  }

  handleClick = ( SceneIndex ) => {
    this.updateScene( SceneIndex );
  }

  handleEvent = ( event = {}) => {
    // const { ask = {}, parentGroupCode } = this.props;
    // const { question = {}, disabled } = ask;
    // const { code } = question;

    // if ( disabled ) {
    //   event.preventDefault();
    //   event.stopPropagation();

    //   return false;
    // }

    const { code, parentGroupCode } = event;

    if (
      code &&
      parentGroupCode
    ) {
      Bridge.sendFormattedEvent(
        {
          code,
          parentCode: parentGroupCode,
        }
      );
    }
  }

  handleChange = ( data ) => {
    const sceneContextsKeys = Object.keys( this.sceneContexts );

    if ( sceneContextsKeys.length === 1 ) {
      if ( this.props.onChangeValue ) {
        this.props.onChangeValue( data, this.sceneContexts[sceneContextsKeys[0]] );
      }
    }
    else {
      console.warn( 'Error: Invalid unity scene contexts' ); // eslint-disable-line
    }
  }

  handleSetScene = ( sceneContext ) => {
    // console.warn( 'handleSetScene', sceneCode );
    this.updateScene( sceneContext );
  }

  handleUnsetScene = ( questionCode ) => {
    // console.warn( 'handleUnsetScene', questionCode );

    const updatedSceneContexts = {
      ...this.sceneContexts,
    };

    // check if question code is in sceneContexts
    if ( isObject( updatedSceneContexts, { withProperty: questionCode })) {
      // remove it
      delete updatedSceneContexts[questionCode];
    }
    else {
      // do nothing
      return;
    }

    // console.warn( 'updatedSceneContexts', questionCode, updatedSceneContexts );

    // check number of remaining values
    const numberOfCurrentSceneCodes = Object.keys( updatedSceneContexts ).length === 1;

    this.sceneContexts = updatedSceneContexts,

    this.setState( state => ({
      currentSceneCode: numberOfCurrentSceneCodes === 0
        // if there are now 0 values, update currentSceneCode to null
        ? null
        : numberOfCurrentSceneCodes === 1
          // if there is now 1 value, update currentSceneCode to match it
          ? numberOfCurrentSceneCodes[0]
          // if there is now 2+ values, dont update currentScene code
          : state.currentSceneCode,
    }));
  }

  render() {
    const { children, renderHeader } = this.props;
    const { progression, currentSceneCode, isLoading } = this.state;

    return (
      <UnityProvider
        value={{
          currentSceneCode: currentSceneCode,
          setScene: this.handleSetScene,
          unsetScene: this.handleUnsetScene,
          progression: progression,
        }}
      >
        {renderHeader}
        <Box
          position="relative"
        >
          <Unity
            unityContent={this.unityContent}
          />
          {
            isLoading ? (
              <Box
                position="absolute"
                top={0}
                bottom={0}
                width="100%"
                // opacity={0.75}
                backgroundColor="white"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <ActivityIndicator size="large" />
                <Box padding={5} />
                <Text
                  align="center"
                  text="Loading..."
                />
              </Box>
            ) : null
          }
        </Box>
        {children}
      </UnityProvider>
    );
  }
}

export default UnityWrapper;
