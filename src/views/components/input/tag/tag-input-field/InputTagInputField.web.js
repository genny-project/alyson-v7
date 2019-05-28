import React, { Component } from 'react';
import { object, func, bool, string, node, array } from 'prop-types';
import { Box, Input, Icon, Touchable } from '../../../index';

class InputTagInputField extends Component {
  static propTypes = {
    inputProps: object,
    getInputProps: func,
    onPress: func,
    handleFocus: func,
    inputValue: string,
    onChangeValue: func,
    onKeyPress: func,
    onRef: func,
    onFocusInput: func,
    children: node,
    isOpen: bool,
    allowMultipleSelection: bool,
    testID: string,
    selectedItems: array,
    nonTabable: bool,
  }

  state = {
    // focused: false,
    focusing: false,
  }

  handleKeyPress = ( event ) => {
    // console.log( 'keypress', event.nativeEvent.key );
    if ( this.props.onKeyPress ) this.props.onKeyPress( event.nativeEvent.key );
  }

  handleRef = ( input ) => {
    this.input = input;

    if ( this.props.onRef ) this.props.onRef( input, 'input' );
  }

  handleState = () => {
    this.setState({
      // focused: event === 'focus' ? true : false,
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
      onFocusInput,
      // onBlur,
      children,
      allowMultipleSelection,
      selectedItems,
      nonTabable,
    } = this.props;

    const selectedItem = selectedItems.map( item => item.label ).join();

    return (
      <Touchable
        onPress={() => {
          // console.log( 'touchable press', this.state.focusing, this.state.focused, isOpen );
          this.state.focusing ? null : onPress();
          this.setState({
            focusing: false,
          });
        }}
        accessibilityRole="link"
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
              value: ( allowMultipleSelection ? inputValue : selectedItem ) || '',
            })}
            updateValueWhenFocused
            onKeyPress={this.handleKeyPress}
            onFocus={() => {
              onFocusInput();
              this.handleState( 'focus' );
            }}
            testID={`input-tag ${testID}`}
            {...( nonTabable ? { tabIndex: '-1' } : null )}
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
          {children}
        </Box>
      </Touchable>
    );
  }
}

export default InputTagInputField;
