import React, { Component } from 'react';
import { array, string, oneOfType, number } from 'prop-types';
import { isString, isObject, bool } from '../../../../utils';
import { Image, Box } from '../../index';

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
    isClosed: bool,
  }

  state = {
    isHover: false,
  }

  handleMouseOver = () => {
    this.setState({
      isHover: true,
    });
  }

  handleMouseOut = () => {
    this.setState({
      isHover: false,
    });
  }

  render() {
    const {
      value,
      height,
      width,
      // editable,
      // ...restProps
    } = this.props;
    const { isHover } = this.state; // eslint-disable-line no-unused-vars

    const getValue = ( file ) => {
      if ( isString( file )) {
        return file;
      }

      if ( isObject( file, { withProperty: 'uploadURL' }))
        return file.uploadURL;

      return '';
    };

    const closedStyle = {
      maxWidth: width,
      maxHeight: height,
      width: '100%',
      height: '100%',
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
          {...this.props.isClosed ? closedStyle : {}}
          position="relative"
        >
          <Image
            source={getValue( value )}
          />
          {/* <Input
            {...restProps}
            type="file"
            imageOnly
            ref={input => this.input = input}
            showInput={editable}
            renderItems={({ validFiles }) => {
              if ( isArray( validFiles, { ofMinLength: 1 })) {
                return (
                  validFiles.map( file => {
                    return (
                      <Image
                        key={getValue( file )}
                        source={getValue( file )}
                      />
                    );
                  })
                );
              }

              return (
                <Image
                  source={getValue( value )}
                />
              );
            }}
            renderInput={({ openModal }) => {
              return (
                <Box
                  top={0}
                  right={0}
                  position="absolute"
                  zIndex={50}
                  opacity={isHover ? 1 : 0}
                  backgroundColor={isHover ? 'rgba( 0, 0, 0, 0.5)' : 'rgba( 0, 0, 0, 0)'}
                  onMouseOver={this.handleMouseOver}
                  onMouseOut={this.handleMouseOut}
                  padding={5}
                  borderRadius={2}
                  // transitionDuration="200ms"
                  // transitionTimingFunction="ease"
                >
                  <Touchable
                    withFeedback
                    onPress={openModal}
                  >
                    <Icon
                      name="photo"
                      color="white"
                      size="sm"
                    />
                  </Touchable>
                </Box>
              );
            }}
          /> */}
        </Box>
      </Box>
    );
  }
}

export default InputImage;
