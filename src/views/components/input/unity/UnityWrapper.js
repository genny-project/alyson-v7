/* eslint-disable react/prop-types */
import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import dlv from 'dlv';
import { Box } from '../..';
import { Bridge, isArray, isString } from '../../../../utils';
import UnityProvider from './provider';

// function UnityUI({ progression, objectClicked, onClick, selected }) {
//   const scenes = ['World View', 'Scene 1', 'Scene 2', 'Scene 3', 'Scene 4'];

//   return (
//     <div>
//       <ul
//         style={{ display: 'flex',
//           justifyContent: 'start',
//           alignItems: 'center' }}
//       >
//         {scenes.map(( scene, index  ) => (
//           <li key={scene}>
//             <button
//               style={{
//                 border: 'none',
//                 background: 'transparent',
//                 fontSize: '18px',
//                 fontWeight: 'bold',
//                 textDecoration: 'none',
//                 listStyleType: 'none',
//                 color: `${selected === scene ? { color: 'tomato' } : { color: 'null' }}`,
//               }}
//               onClick={() => {
//                 onClick( index.toString());
//               }}
//             >
//               {scene}
//             </button>
//           </li>
//         ))}
//       </ul>
//       <div>
//         {`${progression * 100}%`}
//       </div>
//       <div>
//         {`UnityEvent: ${objectClicked}`}
//       </div>
//       <div>
//         {`UnityAnswer: ${objectClicked}`}
//       </div>
//     </div>
//   );
// }

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
    currentSceneCode: null,
  }

  updateScene = ( sceneCode ) => {
    // console.warn( 'updateScene' );

    this.setState({
      currentSceneCode: sceneCode,
    }, () => {
      this.sendEventToUnity( sceneCode );
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

  handleSetScene = ( sceneCode ) => {
    console.warn( 'handleSetScene', sceneCode );
    this.updateScene( sceneCode );
  }

  render() {
    const { children } = this.props;
    const { progression, objectClicked, selected, currentSceneCode } = this.state;

    // console.warn({ progression });

    return (
      <UnityProvider
        value={{
          currentSceneCode: currentSceneCode,
          setScene: this.handleSetScene,
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
