import React, { Component } from 'react';
import { object, func, bool, string } from 'prop-types';
import { Box, Input, Icon, Touchable } from '../../../index';

class InputTagInputField extends Component {
  static propTypes = {
    inputProps: object,
    getInputProps: func,
    onPress: func,
    handleFocus: func,
    shouldFocus: bool,
    inputValue: string,
    onChangeValue: func,
    isOpen: bool,
    testID: string,
  }

  handleKeyPress = ( event ) => {
    console.log( 'keypress', event.nativeEvent.key );
  }

  handleRef = ( input ) => {
    this.input = input;

    if ( this.props.onRef ) this.props.onRef( input, 'input' );
  }

  render() {
    const {
      onPress,
      inputProps,
      getInputProps,
      onChangeValue,
      inputValue,
      shouldFocus,
      testID,
      onFocus,
      onBlur,
    } = this.props;

    return (
      <Touchable
        onPress={() => {
          if ( !this.props.isHighlighted ) {
            onPress();
            shouldFocus && this.input.focus();
          }
        }}
      >
        <Box
          zIndex={10}
          position="relative"
          flexDirection="row"
        >
          <Input
            {...getInputProps({
              ...inputProps,
              type: 'text',
              width: '100%',
              ref: this.handleRef,
              onChangeValue: onChangeValue,
              value: inputValue || '',
            })}
            onKeyPress={this.handleKeyPress}
            onFocus={onFocus}
            testID={`input-tag ${testID}`}
          />
          <Box
            position="absolute"
            height="100%"
            alignItems="center"
            right={10}
            zIndex={5}
          >
            <Icon
              name={!shouldFocus ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
              color="black"
              size="md"
            />
          </Box>
        </Box>
      </Touchable>
    );
  }
}

export default InputTagInputField;
