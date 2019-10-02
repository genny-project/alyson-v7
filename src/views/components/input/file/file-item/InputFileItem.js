import React, { Component } from 'react';
import { func, any, number, bool, oneOfType, string } from 'prop-types';
// import prettierBytes from 'prettier-bytes';
import { Box, Text, Icon, Image, Touchable, Link, Fragment /* PdfViewer */ } from '../../../../components';
import { trimAndAppendDots, isInteger, isObject, isString } from '../../../../../utils';

const fileTypes = {
  zip: 'archive',
  word: 'description',
  pdf: 'picture_as_pdf',
  application: 'attach_file',
  audio: 'music_note',
  font: 'font_download',
  image: 'image',
  text: 'insert-drive-file',
  video: 'videocam',
  default: 'attach_file',
};

class InputFileItem extends Component {
  static defaultProps = {
    imageHeight: 20,
    imageWidth: 20,
    backgroundColor: '#ddd',
    flexDirection: 'row',
    showName: true,
  }

  static propTypes = {
    id: any,
    // size: any,
    name: string,
    // uploaded: any,
    type: string,
    preview: any,
    uploadURL: string,
    // error: any,
    onRemove: func,
    // testID: string,
    nameCharacterLimit: number,
    readOnly: bool,
    imageHeight: oneOfType(
      [string, number]
    ),
    imageWidth: oneOfType(
      [string, number]
    ),
    backgroundColor: string,
    flexDirection: string,
    showName: bool,
    fit: string,
  }

  // state = {
  //   hover: false,
  //   active: false,
  // }

  getIconName() {
    const { type } = this.props;

    const matchType = Object.keys( fileTypes ).find( fileTypeKey => {
      return isString( type ) ? type.includes( fileTypeKey ) : false;
    });

    return isObject( fileTypes, { withProperty: matchType }) ? fileTypes[matchType] : fileTypes['default'];
  }

  handleChangeState = ( newState ) => {
    this.setState( state => ({
      ...state,
      ...newState,
    }));
  }

  render() {
    const {
      id,
      // size,
      name,
      // uploaded,
      type,
      preview,
      uploadURL,
      // error,
      onRemove,
      // testID,
      nameCharacterLimit,
      readOnly,
      imageHeight,
      imageWidth,
      backgroundColor,
      flexDirection,
      showName,
      fit,
      // ...restProps
    } = this.props;

    const hasImagePreview = (
      isString( type ) && type.includes( 'image' ) &&
      ( !!preview || !!uploadURL )
    );

    const trimmedName = isString( name )
      ? isInteger( nameCharacterLimit )
        ? trimAndAppendDots( name, nameCharacterLimit )
        : name
      : isInteger( nameCharacterLimit )
        ? trimAndAppendDots( uploadURL, nameCharacterLimit )
        : uploadURL;

    return (
      <Box
        key={id}
        flexDirection={flexDirection}
        justifyContent="flex-start"
        alignItems="center"
        padding={5}
        marginRight={5}
        marginBottom={5}
        // paddingBottom={15}
        backgroundColor={backgroundColor}
      >
        {/* {
          isString( uploadURL ) && isString( type ) && type.includes( 'pdf' ) ? (
            <PdfViewer file={uploadURL} />
          ) : null
        } */}
        {hasImagePreview ? (
          <Image
            source={uploadURL || preview}
            width={imageHeight}
            height={imageWidth}
            fit={fit}
          />
        ) : (
          <Box>
            <Icon
              name={this.getIconName( type )}
              // name={previewIcons[file.type] ? previewIcons[file.type] : previewIcons.default}
              color="black"
            />
          </Box>
        )}

        { showName
          ? (
            <Fragment>
              <Box
                padding={5}
              />

              {uploadURL
                ? (
                  <Link
                    to={uploadURL}
                    externalLink
                  >
                    <Text
                      size="xs"
                      width="100%"
                      color="blue"
                      decoration="underline"
                      text={trimmedName}
                    />
                  </Link>
                )
                : (
                  <Text
                    size="xs"
                    width="100%"
                  >
                    {trimmedName}
                  </Text>
                )}
            </Fragment>
          ) : null
        }
        {
          !readOnly ? (
            <Fragment>
              <Box
                padding={5}
              />

              <Touchable
                withFeedback
                onPress={() => onRemove ? onRemove( id ) : null}
                onChangeState={this.handleChangeState}
              >
                <Icon
                  name="close"
                  size="sm"
                  color="black"
                  cursor="pointer"
                />
              </Touchable>
            </Fragment>
          ) : null
        }
      </Box>
    );
  }
}

export default InputFileItem;
