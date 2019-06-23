import React, { Component } from 'react';
import { bool, object, string, func } from 'prop-types';
import { isObject } from '../../../../../utils';
import { Box, Touchable, Text, Icon } from '../../../index';

class InputTagSuggestion extends Component {
  static propTypes = {
    item: object,
    itemString: string,
    isSelected: bool,
    isHighlighted: bool,
    allowMultipleSelection: bool,
    functions: object,
    testID: string,
    onFocus: func,
    onBlur: func,
    onPress: func,
    onMouseEnter: func,
  }

  handleFocus = () => {
    if ( this.props.onFocus ) this.props.onFocus();
  }

  handleBlur = () => {
    if ( this.props.onBlur ) this.props.onBlur();
  }

  render() {
    const {
      item,
      itemString,
      isSelected,
      isHighlighted,
      allowMultipleSelection,
      functions,
      testID,
      onFocus,
      onPress,
      onMouseEnter,
      stateBasedProps,
      ...restProps
    } = this.props;

    const getPropsByState = () => {
      console.log( stateBasedProps );

      return {
        ...isObject( stateBasedProps, { withProperty: 'default' }) ? stateBasedProps['default'] : {},
        ...isObject( stateBasedProps, { withProperty: 'hover' }) &&
          isHighlighted
          ? stateBasedProps['hover'] : {},
        ...isObject( stateBasedProps, { withProperty: 'selected' }) &&
          isSelected
          ? stateBasedProps['selected'] : {},
        ...isObject( stateBasedProps, { withProperty: 'disabled' }) &&
          ( this.props.editable === false || this.props.disabled )
          ? stateBasedProps['disabled'] : {},
        ...isObject( stateBasedProps, { withProperty: 'error' }) && this.props.error ? stateBasedProps['error'] : {},
      };
    };

    return (
      <Box
        padding={5}
        alignItems="center"
        backgroundColor={isHighlighted ? '#DDD' : 'white'}
        width="100%"
      >
        <Touchable
          withFeedback
        // tabIndex="-1"
          accessibilityRole="link"
          onPress={() => {
            if ( allowMultipleSelection ) {
              functions.addItemToPreSelection( item, functions.selectMultipleItems );
            }
            else {
              functions.selectItem( item, );
              functions.clearSelection();
              functions.handleCloseMenu();
            }
            if ( onPress ) onPress();
          }}
          onFocus={onFocus}
          onMouseEnter={onMouseEnter}
          testID={`input-tag-option ${testID}`}
        >
          <Icon
            name={isSelected ? 'check_box' : 'check_box_outline_blank'}
            size="sm"
            color="black"
            cursor="pointer"
            {...getPropsByState()}
          />
          <Box
            padding={5}
          />
          <Text
            color={isHighlighted ? 'black' : 'black'}
            fontWeight={isSelected ? 'bold' : 'normal'}
            {...getPropsByState()}
          >
            {itemString}
          </Text>
        </Touchable>

      </Box>
    );
  }
}

export default InputTagSuggestion;
