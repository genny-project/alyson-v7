import React, { Component } from 'react';
import { array, string, oneOfType, number } from 'prop-types';
import { isString, isArray, isObject, bool } from '../../../../utils';
import { Image, Box, Touchable, Input, Icon } from '../../index';

class InputImage extends Component {
  static defaultProps = {
    height: '100%',
    width: '100%',
  }

  static propTypes = {
    items: array.isRequired,
    color: string,
    rootQuestionGroupCode: string,
    height: oneOfType(
      [string, number]
    ),
    width: oneOfType(
      [string, number]
    ),
    value: string,
    editable: bool,
  }

  state = {
    isEditing: false,
  }

  handleToggle = () => {
    this.setState( state => ({
      isEditing: !state.isEditing,
    }));
  }

  render() {
    const {
      value,
      height,
      width,
      editable,
      ...restProps
    } = this.props;
    const { isEditing } = this.state; // eslint-disable-line no-unused-vars

    const getValue = () => {
      if ( isString( value )) {
        return value;
      }
      if ( isArray( value, { ofMinLength: 1 })) {
        const uploadObject = value[0];

        if ( isObject( uploadObject, { withProperty: 'uploadURL' }))

          return uploadObject.uploadURL;
      }

      return '';
    };

    return (
      <Box
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          height={height}
          width={width}
          position="relative"
        >
          {
            editable ? (
              <Box
                top={0}
                right={0}
                position="absolute"
                zIndex={50}
              >
                <Touchable
                  withFeedback
                  onPress={this.handleToggle}
                >
                  <Icon
                    name={isEditing ? 'cancel' : 'photo'}
                    color="white"
                    size="lg"
                  />
                </Touchable>
              </Box>
            ) : null
          }
          {
            isEditing && editable
              ? (
                <Input
                  {...restProps}
                  type="file"
                  imageOnly
                  ref={input => this.input = input}
                />
              )
              : (
                <Image
                  source={getValue()}
                />
              )
          }
        </Box>
      </Box>
    );
  }
}

export default InputImage;
