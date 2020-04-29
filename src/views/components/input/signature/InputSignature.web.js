import React, { Component } from 'react';
import { func } from 'prop-types';
import SignaturePad from 'react-signature-pad-wrapper';
import { Box, Touchable, Text, Icon, Image, ActivityIndicator } from '../../../components';
import { Api, isArray, isObject, convertImageURLtoFile, isFile, createFormDataFromFiles } from '../../../../utils';

function generateKey() {
  return Math.random().toString( 36 ).substring( 2 ) + ( new Date()).getTime().toString( 36 );
}

class InputSignature extends Component {
  // static defaultProps = {
  //   height: 'auto',
  //   width: '100%',
  // };

  static propTypes = {
    // height: oneOfType( [string, number] ),
    // width: oneOfType( [string, number] ),
    onChangeValue: func,
  };

  state = {
    file: null,
    uploading: false,
    deleting: false,
    error: null,
    empty: true,
  };

  /* Helper method for submitting */
  submitSignature = async dataFromDrawingPad => {
    this.setState({
      uploading: true,
      error: null,
    });

    try {
      const imgFile = convertImageURLtoFile( dataFromDrawingPad.data, 'signature.png' );

      const formData = new FormData();

      if ( !isFile( imgFile )) throw 'Error; Invalid \'File\' Object';

      formData.append( 'file', imgFile );

      const formData2 = createFormDataFromFiles( imgFile );

      const response = await Api.postMediaFile({
        data: formData2,
      });
      console.log( "SIGNATURE_UPLOAD_SUCCESS", response ); // eslint-disable-line

      if ( isArray( response.data.files, { ofMinLength: 1 })) {
        this.setState({
          file: response.data.files[0],
          uploading: false,
          empty: true,
        }, () => {
          if ( this.props.onChangeValue ) {
            this.props.onChangeValue( this.state.file ); // send the URl to Genny system
          }
        });
      }
    } catch ( error ) {
      console.error( 'SIGNATURE_UPLOAD_FAILURE', error );
      this.setState({
        uploading: false,
        error: error,
      });
    }
  };

  /* submit thw signature data  from canvas */
  handleSignatureSubmitOnDraw = () => {
    const dataFromDrawingPad = this.signaturePad.toDataURL();

    this.submitSignature({ type: 'draw', data: dataFromDrawingPad });
  };

  handleSignatureEndDraw = () => {
    this.setState({
      empty: this.signaturePad && this.signaturePad.isEmpty(),
    });
  }

  /* submit text  signature data */
  handleSignatureSubmitOnText = () => {
    const { textSignatureValue } = this.state;

    this.submitSignature({ type: 'text', data: textSignatureValue });
  };

  // delete the saved signature
  handleDeleteFile = async ( file ) => {
    this.setState({
      deleting: true,
      error: null,
    });

    try {
      const response = await Api.deleteMediaFile( file.url );
      console.log( "SIGNATURE_DELETE_SUCCESS", response ); // eslint-disable-line

      this.setState({
        deleting: false,
        file: null,
        empty: true,
      }, () => {
        if ( this.props.onChangeValue ) {
          this.props.onChangeValue( [] ); // send the URl to Genny system
        }
      });
    } catch ( error ) {
      console.error( 'SIGNATURE_DELETE_FAILURE', error );
      this.setState({
        deleting: false,
        error: error,
        empty: true,
      });
    }
  }

  // clear the canvas
  handleClearCanvas = () => {
    this.signaturePad.clear();
  };

  /* handle text signature change */
  handleTextSignatureChange = event => {
    const { value } = event.target;

    this.setState({ textSignatureValue: value });
  };

  handleLayout = () => {
    console.warn( 'sending \'resize\' event' ); // eslint-disable-line
    window.dispatchEvent( new Event( 'resize' ));
  }

  render() {
    // const {} = this.props;
    const { width, file, deleting, uploading, error, empty } = this.state;

    const buttons = [];

    if ( !uploading && !deleting ) {
      if ( isObject( file )) {
        buttons.push({ label: 'Clear', icon: 'clear', handlePress: () => this.handleDeleteFile( file ) });
      }
      else {
        buttons.push({ label: 'Clear', icon: 'clear', handlePress: this.handleClearCanvas });
        if ( !empty ) {
          buttons.push({ label: 'Upload', icon: 'publish', handlePress: this.handleSignatureSubmitOnDraw });
        }
      }
    }

    return (
      <Box
        flexDirection="column"
      >
        <Box
          width={width}
          height="100%"
          flexDirection="column"
          backgroundColor="#f9f9f9"
          // position="relative"
          onLayout={this.handleLayout}
        >
          { uploading || deleting || error ? (
            <Box
              justifyContent="center"
              alignItems="center"
              alignSelf="center"
              flexDirection="row"
            >
              <Text
                text={`${error ? error : `File ${uploading ? 'upload' : 'deletion'} in progress`}`}
              />
              <Box
                padding={5}
              />
              { !error ? (
                <ActivityIndicator />
              ) : null }
            </Box>
          ) : null }
          {
            isObject( file, { withProperty: 'url' }) ? (
              <Image
                source={file.url}
              />
            ) : (
              <SignaturePad
                ref={ref => ( this.signaturePad = ref )}
                // redrawOnResize
                height={250}
                // width={300}
                options={{
                  dotSize: 1,
                  minWidth: 0.5,
                  maxWidth: 2,
                  onEnd: this.handleSignatureEndDraw,
                }}
              />
            )
          }
          {/* <Box
            width="100%"
            backgroundColor="white"
            padding={20}
            flexDirection="column"
          >
            <InputText
              type="text"
              // size="lg"
              size="sm"
              padding={10}
              backgroundColor="#f1f1f1"
              borderSize={1}
              width="100%"
              onChange={this.handleTextSignatureChange}
              value={this.state.textSignatureValue}
            />
            <Text
              size="lg"
              fontFamily="satisfy"
              text={this.state.textSignatureValue}
            />
          </Box> */}
          {/* <Box>
            <Input
              type="file"
              editable
            />
          </Box> */}
        </Box>
        <Box>
          {buttons.map( button => {
            return (
              <Touchable
                withFeedback
                key={button.text + generateKey()}
                onPress={button.handlePress}
                backgroundColor="#888"
                padding={4}
              >
                <Text
                  text={button.label}
                />
                <Box
                  paddingRight={4}
                />
                <Icon
                  name={button.icon}
                  color="#aaa"
                  cursor="pointer"
                />
              </Touchable>
            );
          })}
        </Box>
      </Box>
    );
  }
}

export default InputSignature;
