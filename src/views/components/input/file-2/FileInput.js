import React, { Component } from 'react';
import { bool, func } from 'prop-types';
import axios from 'axios';
import { Box, Text, Touchable, Icon } from '../../../components';
import Preview from './Preview';
import { isArray, isString } from '../../../../utils';
import store from '../../../../redux/store';

/* These are commented out to be revisited later */
// import Camera from './Camera';
const fileTypes = ['image/jpeg', 'image/pjpeg', 'image/png'];

class FileInput extends Component {
  static defaultProps = {
    multiple: true,
    // imageOnly: false,
    // accept: [],
  };

  static propTypes = {
    multiple: bool,
    // imageOnly: bool,
    // accept: array,
    onChangeValue: func,
  };

  constructor( props ) {
    super( props );
    this.inputFileNew = React.createRef();
    this.uploadButtonRef = React.createRef();
  }

  state = {
    selectedFiles: [],
    numberOfFilesSelected: 0,
    requestCamera: false,
  };

  componentDidMount() {
    const URL = process.env.ENV_FILE_UPLOAD_URL;

    console.log( URL ); //eslint-disable-line
  }

  getAllFiles = () => {
    const input = this.inputFileNew.current;
    const { files } = input;

    return files;
  };

  // To be visited later for getting data from camera
  // Calculates the size of a selected file to be uploaded in MB
  CalculateFileSize( number ) {
    if ( number < 1024 ) {
      return `${number}bytes`;
    }
    if ( number >= 1024 && number < 1048576 ) {
      return `${( number / 1024 ).toFixed( 1 )}KB`;
    }
    if ( number >= 1048576 ) {
      return `${( number / 1048576 ).toFixed( 1 )}MB`;
    }
  }

  // Check if the incoming value type is correct
  validFileType( file ) {
    for ( var i = 0; i < fileTypes.length; i++ ) {
      if ( file.type === fileTypes[i] ) {
        return true;
      }
    }

    return false;
  }

  sendFilesToBackend() {
    console.log('This method will send files to the backend'); //eslint-disable-line
  }

  // This method generates preview of the files selected to be uploaded
  generatePreview = () => {
    const { selectedFiles } = this.state;

    // Handle the closing of close button in preview component
    const handleClose = file => () => {
      // const dataInhandleCloase =
      // this.state.selectedFiles.filter( item => item.name !== file.name );

      console.warn({ file }); //eslint-disable-line
      this.setState( state => {
        return {
          selectedFiles: state.selectedFiles.filter( item => item.name !== file.name ),
          // eslint-disable-next-line max-len
          numberOfFilesSelected: state.selectedFiles.filter( item => item.name !== file.name ).length,
        };
      }, console.warn(this.state, 'state in handle close')); //eslint-disable-line

      this.uploadFile();
    };

    return (
      <div style={{ display: 'flex', marginTop: 20 }}>
        {isArray( selectedFiles ) ? (
          selectedFiles.map( file => (
            <div
              key={file.name}
              style={{
                position: 'relative',
                border: '1px solid black',
                borderRadius: '4px',
                margin: '10px 5px',
              }}
            >
              <Box>
                <Preview
                  file={file}
                  onHandleClose={handleClose( file )}
                />
              </Box>
            </div>
          ))
        ) : (
          <Text text="No File selected" />
        )}
      </div>
    );
  };

  uploadFile( formData ) {
    const token = store.getState().keycloak.accessToken;
    const URL = process.env.ENV_FILE_UPLOAD_URL;

    if ( !isString( URL, { ofMinLength: 1 })) {
      console.warn( 'variable \'ENV_FILE_UPLOAD_URL\' is not defined' ); // eslint-disable-line

      return;
    }

    axios({
      method: 'post',
      url: URL,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data','Authorization': `bearer ${token}` } ,
    })
    .then(( response ) => {
      // handle success
      console.log(  "FILE_UPLOAD_SUCCESS" ); // eslint-disable-line
      console.warn({ response }); // eslint-disable-line
      if ( this.props.onChangeValue )
        this.props.onChangeValue( response.data.URL ); // send the URl to Genny system
    })
      .catch(( response ) => {
          // handle error
        console.log( response, "FILE_UPLOAD_FAILURE" ); // eslint-disable-line
      });
  }

  handleClickOnHiddenButton = () => {
    this.inputFileNew.current.click();
  };

  handleChange = () => {
    const allFiles = this.getAllFiles();
    const allFilesArray = Array.from( allFiles );

    console.warn({ allFilesArray }); //eslint-disable-line
    const numberOfFilesSelected = allFilesArray.length;

    const newFilesArryFromFormData = this.inputFileNew.current.files;

    this.setState({
      numberOfFilesSelected,
      selectedFiles: allFilesArray,
    });

    const formData = new FormData();

    for ( const pair of newFilesArryFromFormData ) {
      formData.append( 'file', pair );
    }

    this.uploadFile( formData );
  };

  // Please donot remove
  // See the comments on the top
  // handleCamera = () => {
  //   const { requestCamera } = this.state;

  //   this.setState({
  //     requestCamera: true,
  //   });
  // };

  render() {
    const { multiple } = this.props;
    const { numberOfFilesSelected } = this.state;

    return (
      <Box
        flexDirection="column"
        height="auto"
        justifyContent="space-around"
      >
        <Box
          backgroundColor="#121254e8"
          width="100px"
          height="40px"
          alignItems="center"
        >
          <Touchable
            onClick={this.handleClickOnHiddenButton}
            withFeedback
            width="100%"
          >
            <Box
              justifyContent="space-around"
              width="100%"
              alignItems="center"
            >
              <Icon
                name="cloud_upload"
                color="#fff"
              />
              <Text
                size="xxs"
                text="Upload"
                color="#FFF"
              />
              <Text
                text={`(${numberOfFilesSelected})`}
                color="white"
                size="xxs"
              />
            </Box>
          </Touchable>

          <input
            onChange={this.handleChange}
            ref={this.inputFileNew}
            type="file"
            multiple={multiple}
            name="fileupload"
            onClick={this.handleClickOnHiddenButton}
            style={buttonStyle}
          />
        </Box>

        {this.generatePreview()}

        {/* Please DONOT REMOVE*/}
        {/* See the comments above */}

        {/* <EventTouchable
          onPress={this.handleCamera}
          withFeedback
        >
          <Text text=" Camera" />
        </EventTouchable> */}
        {/* Commented out because we are not using this for now */}
        {/* <Camera /> */}

      </Box>
    );
  }
}

const buttonStyle = {
  visibility: 'hidden',
};

export default FileInput;
