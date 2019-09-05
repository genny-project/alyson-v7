import React, { Component } from 'react';
import { bool, func, array, arrayOf, string, number, object } from 'prop-types';
import axios from 'axios';
// import prettierBytes from 'prettier-bytes';
import { Box, Text, Touchable, Icon } from '../..';
import InputFileItem from './file-item';
import { isArray, isString, isObject, isInteger } from '../../../../utils';
import store from '../../../../redux/store';
// import config from '../../../../config';
import { SubcomponentThemeHandler } from '../../form/theme-handlers';

/* These are commented out to be revisited later */
// import Camera from './Camera';
class FileInput extends Component {
  static defaultProps = {
    multiple: true,
    // accept: [],
    value: [],
    defaultValue: [],
    allowedFileTypes: [],
    // maxNumberOfFiles: 3,
    // maxFileSize: 10000,
    // maxTotalFileSize: 100000,
  };

  // use VCL_INPUT to change restriction props

  static propTypes = {
    multiple: bool,
    // imageOnly: bool,
    // accept: array,
    onChangeValue: func,
    defaultValue: array,
    maxFileSize: number,
    value: array,
    maxTotalFileSize: number,
    maxNumberOfFiles: number,
    allowedFileTypes: arrayOf(
      string
    ),
    subcomponentProps: object,
    iconProps: object,
    icon: string,
    iconOnly: bool,
    question: object,
    disabled: bool,
    editable: bool,
    error: string,
    isClosed: bool,
  };

  constructor( props ) {
    super( props );
    this.inputFileNew = React.createRef();
    this.uploadButtonRef = React.createRef();
  }

  state = {
    selectedFiles: [],
    requestCamera: false,
  };

  componentDidMount() {
    const { value } = this.props;
    const URL = process.env.ENV_FILE_UPLOAD_URL;

    console.log( URL ); //eslint-disable-line

    this.updateFilesFromProps();
  }

  componentDidUpdate( prevProps, prevState ) {
    const { value } = this.props;
    const { selectedFiles } = this.props;

    console.log( prevProps, this.props.value );

    const checkForNewFiles = () => {
      // if prevProps.value is different from this.props.value
      // if state.selectedFiles is different from this.props.value
      if (
        isArray( prevProps.value ) &&
        isArray( value ) &&
        prevProps.value.length !== value.length
      ) {
        return true;
      }

      // if (
      //   prevProps.value.some( prevUrl => {
      //     return !value.includes( prevUrl );
      //   })
      // ) {
      //   return true;
      // }

      if (
        isArray( selectedFiles ) &&
        isArray( value ) &&
        selectedFiles.length !== value.length
      ) {
        return true;
      }

      // if (
      //   selectedFiles.some( stateUrl => {
      //     return !value.includes( stateUrl );
      //   })
      // ) {
      //   return true;
      // }

      return false;
    };

    if (
      checkForNewFiles()
    ) {
      this.updateFilesFromProps();
    }
  }

  getFilesFromInput = () => {
    const input = this.inputFileNew.current;
    const { files } = input;

    return files;
  };

  updateFilesFromProps = () => {
    console.log( 'updateFilesFromProps' );
    const { value } = this.props;

    const formattedFiles = value.map( file => ({
      name: file.name,
      uploadURL: file.url,
      type: 'image',
      size: 0,
    }));

    console.log( 'new state files', formattedFiles );

    const fileNames = formattedFiles.map( formattedFile => formattedFile.name );

    this.setState( state => ({
      selectedFiles: [
        ...state.selectedFiles.filter( file => !fileNames.includes( file.name )),
        ...formattedFiles,
      ],
    }));
  }

  sendFilesToBackend() {
    console.log('This method will send files to the backend'); //eslint-disable-line
  }

  uploadFile( formData ) {
    const token = store.getState().keycloak.accessToken;
    // const keycloakData = store.getState().keycloak.data;

    // const URL = `${config.genny.host}${keycloakData.ENV_GENNY_BRIDGE_MEDIA}`;

    // const URL = 'https://internmatch-test.gada.io/qwanda/images';
    const URL = 'https://media-proxy-test.gada.io/public';

    if ( !isString( URL, { ofMinLength: 1 })) {
      console.warn( 'variable \'ENV_FILE_UPLOAD_URL\' is not defined' ); // eslint-disable-line

      return;
    }

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `bearer ${token}`,
    };

    axios.post( URL, formData, {
      headers: headers,
    })
    .then(( response ) => {
      // handle success
      console.log( "FILE_UPLOAD_SUCCESS" ); // eslint-disable-line
      console.warn({ response }); // eslint-disable-line

      if ( isArray( response.data.files )) {
        // response.data.files <- array of UUIDs, need to be appended to:
        // https://media-proxy-test.gada.io/public/<uuid>

        // need an ID to match the uuid with existing files in the state

        const formattedUrls = response.data.files.map( file => ({ name: file.name, url: `${URL}/${file.uuid}` }));

        if ( this.props.onChangeValue ) {
          this.props.onChangeValue( formattedUrls ); // send the URl to Genny system
        }
        this.setState({

        });
      }
    })
    .catch(( response ) => {
      // handle error
      console.log( response, "FILE_UPLOAD_FAILURE" ); // eslint-disable-line
    });
  }

  deleteFile( url, callback ) {
    const token = store.getState().keycloak.accessToken;
    // const keycloakData = store.getState().keycloak.data;

    // const URL = `${config.genny.host}${keycloakData.ENV_GENNY_BRIDGE_MEDIA}`;

    // const URL = 'https://media-proxy-test.gada.io/public';

    const URL = url;

    if ( !isString( URL, { ofMinLength: 1 })) {
      console.warn( 'variable \'ENV_FILE_UPLOAD_URL\' is not defined' ); // eslint-disable-line

      return;
    }

    const headers = {
      // 'Content-Type': 'multipart/form-data',
      Authorization: `bearer ${token}`,
    };

    axios.delete( URL, {
      headers: headers,
    })
    .then(( response ) => {
      // handle success
      console.log( "FILE_DELETE_SUCCESS" ); // eslint-disable-line
      console.warn({ response }); // eslint-disable-line
      callback( 'success' );
    })
    .catch(( response ) => {
      // handle error
      console.log( response, "FILE_DELETE_FAILURE" ); // eslint-disable-line
    });
  }

  handleClickOnHiddenButton = () => {
    this.inputFileNew.current.click();
  };

  handleAddFile = () => {
    const allFiles = this.getFilesFromInput();
    const allFilesArray = Array.from( allFiles );
    const { maxNumberOfFiles, maxFileSize, maxTotalFileSize } = this.props;
    const { selectedFiles } = this.state;

    const addFilesToArray = ( currentItems, newItems ) => {
      console.log({ newItems });
      if (
        isArray( currentItems ) &&
        isArray( newItems )
      ) {
        const duplicateItems = [];
        const newItemNames = newItems.map( newItem => newItem.name );

        console.log({ newItemNames });
        const filteredCurrentItems = currentItems.filter( currentItem => {
          const isItemDuplicate = newItemNames.includes( currentItem.name );

          if ( isItemDuplicate ) {
            duplicateItems.push( currentItem );
          }

          return !isItemDuplicate;
        });

        return filteredCurrentItems.concat( newItems );
      }

      if ( isArray( currentItems ))
        return currentItems;

      if ( isArray( newItems ))
        return newItems;

      return [];
    };

    const formattedNewFiles = allFilesArray.map( file => ({
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    const newFilesArray = addFilesToArray( selectedFiles, formattedNewFiles );

    const checkNumberOfFiles = () => {
      return !isInteger( maxNumberOfFiles ) || newFilesArray.length <= maxNumberOfFiles;
    };

    const checkFileSizes = () => {
      let totalFileSize = 0;
      const invalidFiles = [];

      newFilesArray.forEach( file => {
        totalFileSize = totalFileSize + file.size;

        if ( isInteger( maxFileSize ) && file.size > maxFileSize ) {
          invalidFiles.push( file );
        }
      });

      return !isArray( invalidFiles, { ofMinLength: 1 }) &&
        ( !isInteger( maxTotalFileSize ) || totalFileSize <= maxTotalFileSize );
    };

    if ( checkNumberOfFiles()) {
      if ( checkFileSizes()) {
        console.log({ filesForState: newFilesArray });

        this.setState({
          selectedFiles: newFilesArray,
        });

        console.log({ filesToBeUploaded: allFiles });

        const formData = new FormData();

        // const filesToBeUploaded = newFilesArray.filter( file => !isString( file.url ));

        for ( const pair of allFiles ) {
          formData.append( 'file', pair );
        }

        this.uploadFile( formData );
      }
      else {
        console.warn( 'Invalid: file size exceeds limit' ); // eslint-disable-line
      }
    }
    else {
      console.warn( 'Invalid: number of files exceeds limit' ); // eslint-disable-line
    }
  };

  handleRemoveFile = ( file ) => {
    this.deleteFile( file.uploadURL, ( response ) => {
      if ( response === 'success' ) {
        this.setState( state => {
          return {
            selectedFiles: state.selectedFiles.filter( item => item.name !== file.name ),
            // eslint-disable-next-line max-len
            numberOfFilesSelected: state.selectedFiles.filter( item => item.name !== file.name ).length,
          };
        }, console.warn(this.state, 'state in handle close')); //eslint-disable-line
      }
    });
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
    const {
      multiple,
      subcomponentProps,
      iconProps,
      icon,
      iconOnly,
      question,
      maxNumberOfFiles,
    } = this.props;
    const { selectedFiles } = this.state;

    const hasIcon = isObject( iconProps ) && isString( icon, { ofMinLength: 1 });
    const hasText = !iconOnly && isString( question.name, { isNotSameAs: ' ' });
    const isInputDisabled = this.props.disabled ||
      isInteger( maxNumberOfFiles ) && selectedFiles.length >= maxNumberOfFiles;

    /*
      File Upload Input

      0/ move url to keycloak configs
      1/ select one or more files from the device and send the file data to the upload server
      2/ upload via api, returns a url to the hosted file
      3/ answer needs to be stored as an array of objects containing: uploadurl, name, type
      4/ add any files from the value prop to the state of selected items
      5/ dispay all selected items using the url

      props
      0/ file type restrict
      1/ allow multiple files
    */

    return (
      <SubcomponentThemeHandler
        subcomponentProps={subcomponentProps}
        editable={this.props.editable}
        disabled={isInputDisabled}
        error={this.props.error}
      >
        {({
          componentProps,
          updateState,
          filterComponentProps,
        }) => {
          return (
            <Box
              flexDirection="column"
              // height="auto"
              justifyContent="space-around"
              {...componentProps['input-wrapper']}
            >
              <Box
                flexWrap="wrap"
                {...componentProps['input-selected-wrapper']}
              >
                {isArray( selectedFiles ) ? (
                  selectedFiles.map( file => {
                    const previewImage = file.uploadURL ? file.uploadURL : window.URL.createObjectURL( file.file );

                    console.log({ file });

                    return (
                      <InputFileItem
                        key={file.name}
                        size={file.size}
                        name={file.name}
                        // uploaded={file.uploaded}
                        type={file.type}
                        preview={previewImage}
                        uploadURL={file.uploadURL}
                        onRemove={() => this.handleRemoveFile( file )}
                        onChangeState={this.handleChangeState}
                        stateBasedProps={
                          ({ active, hover }) => filterComponentProps( 'input-selected', { active, hover })
                        }
                        // {...componentProps['input-selected']}
                      />
                    );
                  })
                ) : (
                  <Text text="No File selected" />
                )}
              </Box>

              <Touchable
                onPress={this.handleClickOnHiddenButton}
                withFeedback
                backgroundColor="#121254e8"
                width="100%"
                // height="40px"
                alignItems="center"
                justifyContent="center"
                disabled={isInputDisabled}
                onChangeState={updateState( 'input-field' )}
                {...componentProps['input-field']}
              >
                { hasIcon
                  ? (
                    <Icon
                      name={icon}
                      color="black"
                      {...iconProps}
                      iconProps={componentProps['input-icon']}
                    />
                  ) : null
                  }
                { hasIcon &&
                    hasText
                  ? (
                    <Box
                      paddingRight={5}
                    />
                  ) : null
                  }
                {
                    hasText && !(
                      this.props.isClosed &&
                      hasIcon
                    )
                      ? (
                        <Text
                          whiteSpace="nowrap"
                          text="Add File"
                          {...componentProps['input-field']}
                        />
                      ) : null
                  }
              </Touchable>

              <input
                onChange={this.handleAddFile}
                ref={this.inputFileNew}
                type="file"
                multiple={multiple}
                name="fileupload"
                style={{ display: 'none' }}
                accept={this.props.allowedFileTypes.toString( ',' )}
              />

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
        }}
      </SubcomponentThemeHandler>
    );
  }
}

export default FileInput;
