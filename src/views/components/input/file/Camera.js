import React, { Component } from 'react';
import { number } from 'prop-types';
import { Touchable, Text, Box } from '../../../components';
// import { isString } from '../../../../utils/string';

/*

  *** REFERENCE ***
  Research is done from the mozilla site
  https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos

*/

/* Notes
  1. Please donot Delete the comments they are to be revisited soon based on urgency.
*/

class Camera extends Component {
  static defaultProps = {
    cameraHeight: 400,
    cameraWidth: 400,
    canvasWidth: 400,
    canvasHeight: 400,
  };

  static propTypes = {
    cameraHeight: number,
    cameraWidth: number,
    canvasHeight: number,
    canvasWidth: number,
  };

  constructor( props ) {
    super( props );
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    this.photo = React.createRef();
    this.startButton = React.createRef();
  }

  state = {
    // canvasHidden: true,
    photoData: '',
  };

  componentDidMount() {
    // Ask for camera permission to access camera
    // Since we only need camera we dont request for audio
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then( stream => {
        this.videoRef.current.srcObject = stream;
        this.videoRef.current.play();
      })
      .catch( err => {
        console.error( ` An error occured  ${err}` );
      });

    // Adjust height and width of the camera and canvas the prevews the camera image
    this.adjustCameraHeightAndWidth();
  }

  adjustCameraHeightAndWidth() {
    const { canvasHeight, canvasWidth, cameraHeight, cameraWidth } = this.props;

    this.videoRef.current.setAttribute( 'width', cameraWidth );
    this.videoRef.current.setAttribute( 'height', cameraHeight );
    this.canvasRef.current.setAttribute( 'width', canvasWidth );
    this.canvasRef.current.setAttribute( 'height', canvasHeight );
  }

  // Clear picture form the Canvas

  clearPicture = () => {
    const context = this.canvasRef.getContext( '2d' );

    context.fillStyle = '#AAA';
    context.fillRect( 0, 0, 400, 400 );
    const data = this.canvasRef.toDataurl( 'image/png' );

    // clear the canvas
    this.setState({
      photoData: data,
    });
  };

  handleTakePicture = () => {
    const context = this.canvasRef.current.getContext( '2d' );

    // console.log( 'Handle image press' );
    // console.log( 'Handle context press' );

    // console.log( context );

    this.canvasRef.current.width = 200;
    this.canvasRef.current.height = 200;
    context.drawImage( this.videoRef.current, 0, 0, 200, 200 );

    const data = this.canvasRef.current.toDataURL( 'image/png' );

    // console.warn({ data }, 'data from canvas' );

    this.setState({
      photoData: data,
    });
    this.photoRef.current.setAttribute( 'src', data );
  };

  render() {
    // const { canvasHidden } = this.state;

    // console.warn({ canvasHidden }, 'canvas hidden in state' );

    return (
      <Box>
        <Text size="xl">
Camera
        </Text>
        <div className="camera">
          <video
            id="video"
            ref={this.videoRef}
          >
            Video stream not available.
          </video>
          <Touchable
            onPress={this.handleTakePicture}
            withFeedback
          >
            <Text text="Take Photo" />
          </Touchable>
        </div>
        {/* Canvas is where the image can be manipulated and stored after capturing the image */}
        <canvas
          ref={this.canvasRef}
          id="canvas"
          style={{ display: 'none' }}
        />
        <Box>
          <img
            src={this.state.photoData}
            ref={this.photoRef}
            id="photo"
            name="photo"
            alt="Image captured from camera"
          />
        </Box>
      </Box>
    );
  }
}

export default Camera;
