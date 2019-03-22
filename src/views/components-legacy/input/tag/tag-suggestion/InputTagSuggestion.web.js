import React, { Component } from 'react';
import { bool, object, string } from 'prop-types';
import { LayoutConsumer } from '../../../../layout-legacy';
import { BoxLegacy as Box, TouchableLegacy as Touchable, TextLegacy as Text } from '../../../../components-legacy';
import RecursiveLegacy from '../../../../components-legacy/layout-loader/RecursiveLegacy';

class InputTagSuggestion extends Component {
  static propTypes = {
    renderProp: object,
    item: object,
    itemString: string,
    isSelected: bool,
    isHighlighted: bool,
    touchableProps: object,
    allowMultipleSelection: bool,
    functions: object,
    testID: string,
  }

  render() {
    const {
      renderProp,
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
        testID={`input-tag-option ${item.value || testID}`}
      >
        {
          renderProp
            ? (
              <LayoutConsumer>
                {layout => {
                  const context = {
                    item: {
                      ...item,
                      selected: isSelected,
                    },
                    layout,
                  };

                  return (
                    <RecursiveLegacy
                      {...renderProp}
                      context={context}
                    />
                  );
                }}
              </LayoutConsumer>
            )
            : (
              <Box
                padding={15}
                borderBottomWidth={1}
                borderColor="#DDD"
                borderStyle="solid"
                alignItems="center"
              >
                <Text
                  color={isHighlighted ? 'black' : 'gray'}
                  fontWeight={isSelected ? 'bold' : 'normal'}
                >
                  {itemString}
                </Text>
              </Box>
            )
          }
      </Touchable>
    );
  }
}

export default InputTagSuggestion;
