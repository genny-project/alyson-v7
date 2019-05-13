import React, { Component } from 'react';
import { bool, object, string, func } from 'prop-types';
import { Box, Touchable, Text } from '../../../index';

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
    } = this.props;

    return (
      <Touchable
        withFeedback
        onPress={() => {
          if ( allowMultipleSelection ) {
            functions.addItemToPreSelection( item, functions.selectMultipleItems );
          }
          else {
            functions.selectItem( item, );
            functions.clearSelection();
            functions.handleToggleMenu();
          }
        }}
        testID={`input-tag-option ${testID}`}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <Box
          padding={15}
          borderBottomWidth={1}
          borderColor="#DDD"
          borderStyle="solid"
          alignItems="center"
          backgroundColor={isHighlighted ? 'red' : 'white'}
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
