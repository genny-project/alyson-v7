/* eslint-disable react/prop-types */
import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import { Box } from '../..';
import { Bridge, isObject } from '../../../../utils';
import UnityProvider from './provider';

class UnityWrapper extends React.Component {
  constructor( props ) {
    super( props );
    this.unityContent = new UnityContent(
      // '/unity/unison_webgl_genny.json',
      '/unity/unison_webgl.json',
      '/unity/UnityLoader.js'
    );

    this.unityContent.on( 'progress', progression => {
      this.setState({
        progression: progression,
      });
    });

    this.unityContent.on( 'unityEvent', ( params ) => {
      this.handleEvent( params );
      // this.setState({
      //   objectClicked: params,
      // });
    });

    this.unityContent.on( 'unityAnswer', ( params ) => {
      // console.log( 'insideunitycontent' );
      this.handleChange( params );
      // this.setState({
      //   objectClicked: params,
      // });
    });
  }

  sceneContexts = {}

  state = {
    progression: null,
    currentSceneCode: null,
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
      if ( updatedSceneContexts[questionCode] !== sceneCode ) {
        // if different, update
        updatedSceneContexts[questionCode] = sceneCode;
      }
      else {
        // if same, no update
        // console.warn( 'no update' );

        return;
      }
    }
    else {
      // if not stored, update
      updatedSceneContexts[questionCode] = sceneCode;
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

  handleEvent = ( event ) => {
    const { ask = {}, parentGroupCode } = this.props;
    const { question = {}, disabled } = ask;
    const { code } = question;

    if ( disabled ) {
      event.preventDefault();
      event.stopPropagation();

      return false;
    }

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

  handleChange = ( event ) => {
    if ( this.props.onChangeValue )
    {
      this.props.onChangeValue( event );
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
    const { children } = this.props;
    const { progression, currentSceneCode } = this.state;

    // console.warn({ progression });

    return (
      <UnityProvider
        value={{
          currentSceneCode: currentSceneCode,
          setScene: this.handleSetScene,
          unsetScene: this.handleUnsetScene,
          progression: progression,
        }}
      >
        <Box
          flexDirection="column"
        >
          {/* <UnityUI
            progression={progression}
            objectClicked={objectClicked}
            onClick={this.handleClick}
            selected={selected}
          /> */}
          <Box>
            <Unity
              unityContent={this.unityContent}
            />
          </Box>
          <Box
            flexDirection="column"
          >
            {children}
          </Box>
        </Box>
      </UnityProvider>
    );
  }
}

export default UnityWrapper;
