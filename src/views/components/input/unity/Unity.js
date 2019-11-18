/* eslint-disable react/prop-types */
import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import { Bridge } from '../../../../utils';

class UnityComponent extends React.Component {
  constructor(props) {
    super(props);
    this.unityContent = new UnityContent(
      //'/unity/unison_webgl_genny.json',
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
    });

    this.unityContent.on( 'unityAnswer', ( params ) => {
      // console.log( 'insideunitycontent' );
      this.handleChange( params );

    });
  }

  onClick = (SceneIndex) => {
    this.unityContent.send(
      "Main Camera",
      "ChangeScene",
      SceneIndex
    );
  }

  state = {
    progression: null,
    eventname: 'none',
    answername: 'none',
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
          {`${this.state.progression * 100}%`}
        </div>
        <div>
          {`UnityEvent: ${this.state.eventname}`}
        </div>
        <div>
          {`UnityAnswer: ${this.state.answername}`}
        </div>
        <div>
          <button onClick={() => this.onClick('0')}>World View</button>
          <button onClick={() => this.onClick('1')}>Scene 1</button>
          <button onClick={() => this.onClick('2')}>Scene 2</button>
          <button onClick={() => this.onClick('3')}>Scene 3</button>
          <button onClick={() => this.onClick('4')}>Scene 4</button>
        </div>
        <div>
          <Unity unityContent={this.unityContent} />
        </div>
      </div>);
  }
}

export default UnityComponent;