import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import Proptypes from 'prop-types';

class UnityComponent extends React.Component {
  static propTypes = {
    onChangeValue: Proptypes.func,
    onChange: Proptypes.func,
  }

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
    this.unityContent.on( 'ObjectClick', objectname => {
      // console.log( 'insideunitycontent' );
      this.handleChange( objectname );
    });
  }

  state = {
    progression: null,
    objectname: 'none',
  }

  handleChange = ( event ) => {
    console.log( 'InsideUnity', this.props.onChangeValue );
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
