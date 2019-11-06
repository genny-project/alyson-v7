import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';

class UnityComponent extends React.Component {
  constructor(props) {
    super(props);
    this.unityContent = new UnityContent(
      '/unity/unison_webgl.json',
      '/unity/UnityLoader.js'
    );
    this.unityContent.on('progress', progression => {
      this.setState({
        progression: progression,
      });
    });
    this.unityContent.on('ObjectClick', objectname => {
      this.setState({
        objectname: objectname,
      });
    });
  }

  state = {
    progression: null,
    objectname: "none",
  }

  render() {
    return (
      <div>
        <div>{`Loading ${this.state.progression * 100}%`}</div>
        <div>{`Object pressed: ${this.state.objectname}`}</div>
        <div><Unity unityContent={this.unityContent} /></div>
      </div>);
  }
}

export default UnityComponent;