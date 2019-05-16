import React, { Component } from 'react';
import { object, func, bool, string } from 'prop-types';
import { Box, Input, Icon, Touchable, Text } from '../../../index';

class InputTagInputField extends Component {
  static propTypes = {
    inputProps: object,
    getInputProps: func,
    onPress: func,
    handleFocus: func,
    inputValue: string,
    onChangeValue: func,
    isOpen: bool,
    testID: string,
  }

  state = {
    focused: false,
  }

  handleKeyPress = ( event ) => {
    // console.log( 'keypress', event.nativeEvent.key );
    if ( this.props.onKeyPress ) this.props.onKeyPress( event.nativeEvent.key );
  }

  handleRef = ( input ) => {
    this.input = input;

    if ( this.props.onRef ) this.props.onRef( input, 'input' );
  }

  // handleFocus = () => {
  //   console.log( 'focus TOUCHABLE' );
  //   this.setState({

  //   });
  // }

  handleState = ( event ) => {
    this.setState({
      focused: event === 'focus' ? true : false,
      focusing: true,
    });
  }

  render() {
    const {
      onPress,
      inputProps,
      getInputProps,
      onChangeValue,
      inputValue,
      isOpen,
      testID,
      onFocus,
      onBlur,
      formattedItems,
    } = this.props;

    return (
      <Touchable
        onPress={() => {
          console.log( 'touchable press', this.state.focusing, this.state.focused, isOpen );
          this.state.focusing ? null : onPress();
          this.setState({
            focusing: false,
          });
        }}
        // onFocus={this.handleFocus}
      >
        <Box
          zIndex={10}
          position="relative"
          flexDirection="row"
        >
          <Text
            text={formattedItems}
            color="black"
            size="xs"
          />
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
            onFocus={() => {
              onFocus();
              this.handleState( 'focus' );
            }}
            onBlur={() => this.handleState( 'blur' )}
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
              name={isOpen ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
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
