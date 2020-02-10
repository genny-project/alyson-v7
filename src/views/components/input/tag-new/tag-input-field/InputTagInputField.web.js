import React, { Component } from 'react';
import { object, func, bool, string, node, array } from 'prop-types';
import { isString } from '../../../../../utils';
import { Box, Input, Icon, /* Touchable, */ MenuButton } from '../../../index';

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
    iconProps: object,
    stateBasedProps: object,
    onChangeState: func,
    placeholder: string,
  }

  state = {
    // focused: false,
    focusing: false,
  }

  handleKeyPress = ( event ) => {
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

  handleChangeState = ( newState ) => {
    this.setState( state => ({
      ...state,
      ...newState,
    }));
  }

  render() {
    const {
      onPress,
      getInputProps,
      // onChangeValue,
      inputValue,
      isOpen,
      testID,
      onFocusInput,
      // onBlur,
      children,
      allowMultipleSelection,
      selectedItems,
      nonTabable,
      iconProps,
      stateBasedProps,
      ...restProps
    } = this.props;
    const selectedItem = selectedItems.map( item => item.label ).join();

    // console.log( restProps );

    return (
      <MenuButton
        onPress={() => {
          // console.log( 'touchable press', this.state.focusing, this.state.focused, isOpen );
          this.state.focusing ? null : onPress();
          this.setState({
            focusing: false,
          });
        }}
        onFocus={() => {
          console.log( 'touchable focus' );
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
              ...restProps,

              type: 'text',
              width: '100%',
              value: ( allowMultipleSelection ? inputValue : ( isString( selectedItem, { ofMinLength: 1 }) ? selectedItem : this.props.placeholder ) || inputValue ) || '',
              ...stateBasedProps,
            })}
              // disabled={!allowMultipleSelection}
            cursor={allowMultipleSelection ? 'cursor' : 'pointer'}
            updateValueWhenFocused
            onKeyPress={this.handleKeyPress}
            onFocus={() => {
              console.log( 'input focus' );
              onFocusInput();
              this.handleState( 'focus' );
            }}
            onBlur={() => {console.log( 'input blur' );}}
            testID={`input-tag ${testID}`}
            {...( nonTabable ? { tabIndex: '-1' } : null )}
            blurOnSubmit={allowMultipleSelection ? false : true}
            onChangeState={this.props.onChangeState}
          />
          <Box
            position="absolute"
            height="100%"
            alignItems="center"
            right={10}
            zIndex={5}
          >
            <Icon
              name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
              color="blue"
              size="md"
              {...iconProps}
            />
          </Box>
          {children}
        </Box>
      </MenuButton>
    );
  }
}

export default InputTagInputField;
