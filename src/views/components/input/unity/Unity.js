import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import queryString from 'query-string';

class UnityComponent extends React.Component {
  constructor(props) {
    super(props);

    // creat an obj

    // let foo = {
    // dataUrl
    //wasmCodeUrl
    //wasmFrameworkUrl
    //}
    this.unityContent = new UnityContent(
      '/unity/unison_webgl.json',
      '/unity/UnityLoader.js'
      // queryString.parse(('https://raw.githubusercontent.com/genny-project/alyson-v7/baradUnity/public/unity/unison_webgl.json')),
      // 'https://raw.githubusercontent.com/genny-project/alyson-v7/baradUnity/public/unity/UnityLoader.js'
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

  onClick = (SceneIndex) => {
    this.unityContent.send(
      "Main Camera",
      "ChangeScene",
      SceneIndex
    );
  }

  state = {
    progression: null,
    objectname: 'none',
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
