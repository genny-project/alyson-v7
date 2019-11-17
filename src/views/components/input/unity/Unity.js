/* eslint-disable react/prop-types */
import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import { store } from '../../../../redux' ;
import { Bridge } from '../../../../utils';

class UnityComponent extends React.Component {
  constructor( props ) {
    super( props );
    this.unityContent = new UnityContent(
      '/unity/unison_webgl.json',
      '/unity/UnityLoader.js'
    );

    this.unityContent.on( 'progress', progression => {
      this.setState({
        progression: progression,
      });
    });

    this.unityContent.on( 'sendEvent', ( params ) => {
      this.handleEvent( params );
    });

    this.unityContent.on( 'sendAnswer', ( params ) => {
      // console.log( 'insideunitycontent' );
      this.handleChange( params );
    });
  }

  state = {
    progression: null,
    objectname: 'none',
  }

  handleEvent = ( event ) => {
    const { code } = this.props.ask.question;
    const { parentGroupCode } = this.props;
    const { disabled } = this.props.ask;

    console.log( 'thisobject:', this );

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
    // console.log( 'InsideUnity', this.props.onChangeValue );
    if ( this.props.onChangeValue )
      this.props.onChangeValue( event );
  }

  render() {
    return (
      <div>
        <div>
          {`Loading ${this.state.progression * 100}%`}
        </div>
        <div>
          {`Object pressed: ${this.state.objectname}`}
        </div>
        <div>
          <Unity unityContent={this.unityContent} />
        </div>
      </div> );
  }
}

export default UnityComponent;
