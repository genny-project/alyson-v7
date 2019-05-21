import React, { Component } from 'react';
import { bool, object, string, func } from 'prop-types';
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
    } = this.props;

    return (
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
        <Box
          padding={5}
          alignItems="center"
          backgroundColor={isHighlighted ? '#DDD' : 'white'}
          width="100%"
        >
          <Icon
            name={isSelected ? 'check_box' : 'check_box_outline_blank'}
            size="sm"
            color="black"
            cursor="pointer"
          />
          <Box
            padding={5}
          />
          <Text
            color={isHighlighted ? 'black' : 'black'}
            fontWeight={isSelected ? 'bold' : 'normal'}
          >
            {itemString}
          </Text>
        </Box>
      </Touchable>
    );
  }
}

export default InputTagSuggestion;
