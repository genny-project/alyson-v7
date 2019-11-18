import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';

class UnityComponent extends React.Component {
  constructor(props) {
    super(props);
    this.unityContent = new UnityContent(
      //'/unity/unison_webgl_genny.json',
      '/unity/unison_webgl.json',
      '/unity/UnityLoader.js'
    );

    this.unityContent.on('progress', progression => {
      this.setState({
        progression: progression,
      });
    });

    this.unityContent.on('unityEvent', eventname => {
      this.setState({
        eventname: eventname,
      });
    });
    this.unityContent.on('unityAnswer', answername => {
      this.setState({
        answername: answername,
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
    eventname: 'none',
    answername: 'none',
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