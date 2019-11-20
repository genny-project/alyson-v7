/* eslint-disable react/prop-types */
import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import dlv from 'dlv';
import { Box } from '../../../components';
import { Bridge, isArray, isString } from '../../../../utils';

function UnityUI({ progression, objectClicked, onClick, selected }) {
  const scenes = ['World View', 'Scene 1', 'Scene 2', 'Scene 3', 'Scene 4'];

  return (
    <div>
      <ul
        style={{ display: 'flex',
          justifyContent: 'start',
          alignItems: 'center' }}
      >
        {scenes.map(( scene, index  ) => (
          <li key={scene}>
            <button
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '18px',
                fontWeight: 'bold',
                textDecoration: 'none',
                listStyleType: 'none',
                color: `${selected === scene ? { color: 'tomato' } : { color: 'null' }}`,
              }}
              onClick={() => {
                onClick( index.toString());
              }}
            >
              {scene}
            </button>
          </li>
        ))}
      </ul>
      <div>
        {`${progression * 100}%`}
      </div>
      <div>
        {`UnityEvent: ${objectClicked}`}
      </div>
      <div>
        {`UnityAnswer: ${objectClicked}`}
      </div>
    </div>
  );
}
class UnityComponent extends React.Component {
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
      this.setState({
        objectClicked: params,
      });
    });

    this.unityContent.on( 'unityAnswer', ( params ) => {
      // console.log( 'insideunitycontent' );
      this.handleChange( params );
      this.setState({
        objectClicked: params,
      });
    });
  }

  state = {
    progression: null,
    objectClicked: 'none',
    selected: 'World View',
    sceneCode: null,
  }

  componentDidUpdate( nextProps ) {
    // const askLinks = dlv( nextProps, `asks.${nextProps.ask.questionCode}.links` );

    // console.warn({ askLinks, asks: nextProps.asks, nextProps, progression: this.state.progression });

    // if ( isArray( askLinks, { ofMinLength: 1 })) {
    //   askLinks.filter( link => link.type === 'unity' );

    //   if ( isArray( askLinks, { ofMinLength: 1 })) {
    //     const { sceneCode } = askLinks[0];

    //     if ( isString( sceneCode )) {
    //       if ( sceneCode !== this.state.sceneCode ) {
    //         if ( this.state.progression === 1 ) {
    //           this.updateScene( sceneCode );
    //         }
    //       }
    //     }
    //   }
    // }
  }

  updateScene = ( sceneCode ) => {
    console.warn( 'updateScene' );

    this.setState({
      sceneCode: sceneCode,
    }, () => {
      this.sendEventToUnity( sceneCode );
    });
  }

  sendEventToUnity = ( SceneIndex ) => {
    console.warn({ index: SceneIndex });
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
    const { code } = this.props.ask.question;
    const { parentGroupCode } = this.props;
    const { disabled } = this.props.ask;

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

  render() {
    const { children } = this.props;
    const { progression, objectClicked, selected } = this.state;

    console.log({ children });

    return (
      <Box
        flexDirection="column"
      >
        <UnityUI
          progression={progression}
          objectClicked={objectClicked}
          onClick={this.handleClick}
          selected={selected}
        />
        <Unity
          unityContent={this.unityContent}
        />
        {children}
      </Box>
    );
  }
}

export default UnityComponent;
