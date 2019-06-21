import React, { Component } from 'react';
import { object, func, bool, string, node, array } from 'prop-types';
import { isObject } from '../../../../../utils';
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
    iconProps: object,
  }

  state = {
    // focused: false,
    focusing: false,
    hover: false,
    active: false,
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
    const { hover, active } = this.state;

    const selectedItem = selectedItems.map( item => item.label ).join();

    const getPropsByState = ( propObject ) => {
      return {
        ...isObject( propObject, { withProperty: 'default' }) ? propObject['default'] : {},
        ...isObject( propObject, { withProperty: 'hover' }) &&
        hover
          ? propObject['hover'] : {},
        ...isObject( propObject, { withProperty: 'active' }) &&
        active
          ? propObject['active'] : {},
        ...isObject( propObject, { withProperty: 'disabled' }) &&
          ( this.props.editable === false || this.props.disabled )
          ? propObject['disabled'] : {},
        ...isObject( propObject, { withProperty: 'error' }) && this.props.error ? propObject['error'] : {},
      };
    };

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
              ...restProps,
              type: 'text',
              width: '100%',
              value: ( allowMultipleSelection ? inputValue : selectedItem ) || '',
              ...getPropsByState( stateBasedProps ),
            })}
            updateValueWhenFocused
            onKeyPress={this.handleKeyPress}
            onFocus={() => {
              onFocusInput();
              this.handleState( 'focus' );
            }}
            testID={`input-tag ${testID}`}
            {...( nonTabable ? { tabIndex: '-1' } : null )}
            blurOnSubmit={allowMultipleSelection ? false : true}
            onChangeState={this.handleChangeState}
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
              {...getPropsByState( iconProps )}
            />
          </Box>
          {children}
        </Box>
      </Touchable>
    );
  }
}

export default InputTagInputField;
