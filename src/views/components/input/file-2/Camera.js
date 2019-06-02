import React, { Component } from 'react';

/*
  *** REFERENCE ***
  Research is done from the mozilla site
  https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos
*/

class Camera extends Component {

  constructor()
  defaultProps = {};

  propTypes = {};

  state = {
    canvasHidden: true,
  };

  componentDidMount() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then( stream => {
        video.srcObject = stream;
        video.play();
      })
      .catch( err => {
        console.log( `An error occurred: ${err}` );
      });
  }

  render() {
    const { canvasHidden } = this.state;

    return (
      <div>
        <h1>
Camera
        </h1>
        <div className="camera">
          <video
            id="video"
            ref={this.videoRef}
          >
            Video stream not available.
          </video>
          <button id="startbutton">
Take photo
          </button>
        </div>
        <canvas
          id="canvas"
          style={{ display: canvasHidden ? 'none' : 'initial' }}
        />
        <div className="output">
          <img
            id="photo"
            name="photo"
            alt="Image captured from camera"
          />
        </div>
      </div>
    );
  }
}

export default Camera;
