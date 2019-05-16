import React, { Component } from 'react';
import { bool, object, string, func } from 'prop-types';
import { Box, Touchable, Text, Input } from '../../../index';

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
    } = this.props;

    return (
      <Touchable
        withFeedback
        tabIndex={-1}
        onPress={() => {
          if ( allowMultipleSelection ) {
            functions.addItemToPreSelection( item, functions.selectMultipleItems );
          }
          else {
            functions.selectItem( item, );
            functions.clearSelection();
            functions.handleToggleMenu();
          }
          if ( onPress ) onPress();
        }}
        onFocus={onFocus}
        testID={`input-tag-option ${testID}`}
      >
        <Box
          padding={5}
          borderBottomWidth={1}
          borderColor="#DDD"
          borderStyle="solid"
          alignItems="center"
          backgroundColor={isHighlighted ? 'red' : 'white'}
          width="100%"
        >
          <Text
            color={isHighlighted ? 'black' : 'gray'}
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
