import React, { Component } from 'react';
import { bool } from 'prop-types';
import { Box, Text, Icon, EventTouchable } from '../../../components';
import Preview from './Preview';
import { isArray, isObject, sort } from '../../../../utils';
import uuid from 'uuid/v4';

const fileTypes = ['image/jpeg', 'image/pjpeg', 'image/png'];

// Check if file is of valid type

function validFileType( file ) {
  for ( var i = 0; i < fileTypes.length; i++ ) {
    if ( file.type === fileTypes[i] ) {
      return true;
    }
  }

  return false;
}

class FileInput extends Component {
  static defaultProps = {
    multiple: true,
  };

  static propTypes = {
    multiple: bool,
  };

  constructor( props ) {
    super( props );
    this.inputFileNew = React.createRef();
  }

  state = {
    selectedFiles: [],
    numberOfFilesSelected: 0,
  };

  getAllFiles = () => {
    const input = this.inputFileNew.current;
    const { files } = input;

    return files;
  };

  // Calculates the size of a selected file to be uploaded in MB
  calculateFileSize( number ) {
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

  sendFilesToBackend() {
    console.log('This method will send files to the backend'); //eslint-disable-line
  }

  // This method generates preview of the files selected to be uploaded
  generatePreview = () => {
    const { selectedFiles } = this.state;

    // Handle the closing of close button in preview component
    const handleClose = file => () => {
      const dataInhandleCloase = this.state.selectedFiles.filter( item => item.name !== file.name );

      console.warn({ file }); //eslint-disable-line
      this.setState( state => {
        return {
          selectedFiles: state.selectedFiles.filter( item => item.name !== file.name ),
          numberOfFilesSelected: state.selectedFiles.filter( item => item.name !== file.name ).length,
        };
      }, console.warn(this.state, 'state in handle close')); //eslint-disable-line
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

  handleChange = () => {
    const allFiles = this.getAllFiles();
    const allFilesArray = Array.from( allFiles );

    console.warn({ allFilesArray }); //eslint-disable-line
    const numberOfFilesSelected = allFilesArray.length;

    this.setState({
      numberOfFilesSelected,
      selectedFiles: allFilesArray,
    });
  };

  render() {
    const { multiple } = this.props;
    const { numberOfFilesSelected } = this.state;

    return (
      <div>
        <h2>
File input component
        </h2>
        <input
          onChange={this.handleChange}
          ref={this.inputFileNew}
          type="file"
          multiple={multiple}
          name="file-upload"
        />

        <Box>
          <Text text="Selected Items:" />
          <Text text={numberOfFilesSelected} />
          <Box>
            {this.generatePreview()}
          </Box>
        </Box>
      </div>
    );
  }
}

export default FileInput;
