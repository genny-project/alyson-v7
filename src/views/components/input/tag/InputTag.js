import React, { Component } from 'react';
import { string, func, array, bool, object } from 'prop-types';
import { isString, isArray, isObject, isInteger } from '../../../../utils';
import { Box, MultiDownshift, Text } from '../../index';
import InputTagBody from './tag-body';
import InputTagInputField from './tag-input-field';
import InputTagItem from './tag-item';
import InputTagSuggestion from './tag-suggestion';
import InputTagSuggestionContainer from './tag-suggestion-container';

class InputTag extends Component {
  static defaultProps = {
    placeholder: 'Add a tag...',
    items: [],
    itemStringKey: 'label',
    itemValueKey: 'value',
    itemIdKey: 'id',
    allowNewTags: true,
  }

  static propTypes = {
    placeholder: string,
    onChangeValue: func,
    items: array,
    itemStringKey: string,
    itemValueKey: string,
    itemIdKey: string,
    value: array,
    allowNewTags: bool,
    allowMultipleSelection: bool,
    tagsWrapperProps: object,
    renderTag: object,
    renderSuggestion: object,
    testID: string,
    onBlur: func,
  }

  inputs = {};

  state = {
    preSelected: [],
  }

  shouldComponentUpdate( nextProps ) {
    if ( nextProps.items !== this.props.items )
      return true;

    return false;
  }

  itemToString = ( item ) => {
    return isObject( item ) ? item[this.props.itemStringKey] : item;
  }

  addItemToPreSelection = ( item, callback ) => {
    const { itemValueKey } = this.props;

    this.setState(
      ({ preSelected }) => ({
        preSelected: preSelected.filter( i => i[itemValueKey] === item[itemValueKey] ).length > 0
          ? preSelected.filter( i => i[itemValueKey] !== item[itemValueKey] )
          : [...preSelected, item],
      }), () => {
        if ( callback ) callback( this.state.preSelected );
      });
  }

  removeItemToPreSelection = ( item ) => {
    const { itemValueKey } = this.props;

    this.setState(
      ({ preSelected }) => ({
        preSelected: preSelected.filter( i => i[itemValueKey] !== item[itemValueKey] ),
      })
    );
  }

  handleRef = ( ref, id ) => {
    if ( ref ) {
      this.inputs[id] = ref;
    }
  }

  handleChange = selectedItems => {
    // console.log( 'handleChange', selectedItems );
    if ( this.props.onChangeValue ) {
      this.props.onChangeValue( selectedItems.map( i => i[this.props.itemValueKey]
        ? i[this.props.itemValueKey]
        : i
      ));
    }
  }

  handleFilter = ( inputValue, selectedItems ) => dropdownItem => {
    const { itemStringKey } = this.props;
    const itemString = isObject( dropdownItem ) ? dropdownItem[itemStringKey] : dropdownItem;

    if ( selectedItems && selectedItems.includes( itemString ))
      return false;

    if ( !dropdownItem )
      return true;

    if ( !inputValue )
      return true;

    if (
      isString( itemString ) &&
      itemString.toLowerCase().includes( inputValue.toLowerCase())
    ) {
      return true;
    }

    return false;
  }

  handleKeyPress = ({
    key,
    setHighlightedIndex,
    highlightedIndex,
    maxIndex,
    item,
    selectMultipleItems,
    handleCloseMenu,
    handleOpenMenu,
    isOpen,
    selectItem,
  }) => {
    const itemString = isObject( item ) ? item[this.props.itemStringKey] : item;
    const itemId = isObject( item ) ? item[this.props.itemValueKey] : item;
    const itemObject = isObject( item )
      ? item
      : {
        [this.props.itemStringKey]: itemString,
        [this.props.itemValueKey]: itemId,
      };

    switch ( key ) {
      case 'ArrowDown':
        if ( !isOpen ) handleOpenMenu();
        setHighlightedIndex(
          highlightedIndex >= maxIndex || highlightedIndex == null
            ? 0 : highlightedIndex + 1
        );
        break;
      case 'ArrowUp':
        if ( !isOpen ) handleOpenMenu();
        setHighlightedIndex(
          highlightedIndex <= 0 || highlightedIndex == null
            ? maxIndex : highlightedIndex - 1
        );
        break;
      case 'Enter':
        if ( this.props.allowMultipleSelection ) {
          this.addItemToPreSelection( itemObject, selectMultipleItems );
        }
        else {
          selectItem( itemObject );
          handleCloseMenu();
          if ( this.inputs && this.inputs['input'] ) {
            this.inputs['input'].blur();
          }
        }
        break;
      case 'Tab':
        if ( handleCloseMenu ) handleCloseMenu();
        break;

      default:
        if ( maxIndex > 0 ) {
          setHighlightedIndex( 0 );
        }
    }
  }

  handleSuggestionPress = () => {
    if ( this.inputs && this.inputs['input'] ) {
      if ( this.props.allowMultipleSelection ) {
        this.inputs['input'].focus();
      }
      else {
        this.inputs['input'].blur();
      }
    }
  }

  render() {
    const {
      items,
      value,
      itemStringKey,
      itemValueKey,
      allowNewTags,
      allowMultipleSelection,
      tagsWrapperProps,
      renderTag,
      renderSuggestion,
      testID,
      onBlur, // eslint-disable-line no-unused-vars
      ...restProps
    } = this.props;

    return (
       // STATE HOLDER
      <MultiDownshift
        allowMultipleSelection={allowMultipleSelection}
        onChange={this.handleChange}
        itemToString={this.itemToString}
        selectedItems={
          isArray( value )
            ? value.map( i => {
              const item = isObject( i )
                ? items.filter( x => x[itemValueKey] === i[itemValueKey] ).length > 0
                  ? items.filter( x => x[itemValueKey] === i[itemValueKey] )[0]
                  : i
                : items.filter( x => x[itemValueKey] === i ).length > 0
                  ? items.filter( x => x[itemValueKey] === i )[0]
                  : { [itemStringKey]: i, [itemValueKey]: i };

              return item;
            })
            : null
        }
        addItemFunction={(( selectedItems, newItem ) => {
          return selectedItems.filter( i => (
            newItem != null &&
            i[itemValueKey] === newItem[itemValueKey] )).length === 0
            ? [...allowMultipleSelection ? selectedItems : [], newItem]
            : selectedItems;
        })}
        removeItemFunction={(( selectedItems, newItem ) => (
          selectedItems.filter( i => i[itemValueKey] !== newItem[itemValueKey] )
        ))}
      >
        {({
          getRootProps,
          getInputProps,
          getRemoveButtonProps,
          getItemProps,
          removeItem,
          isOpen,
          inputValue,
          selectedItems,
          highlightedIndex,
          handleToggleMenu,
          handleOpenMenu,
          handleCloseMenu,
          selectItem,
          onInputValueChange,
          clearSelection,
          selectMultipleItems,
          setHighlightedIndex,
        }) => {
          const userCreatedTags = [];

          selectedItems.forEach( selectedItem => {
            const isMatch = items.some( item => {
              return (
                item.value === selectedItem.value ||
                item.value === inputValue ||
                selectedItem.value === inputValue
              );
            });

            if ( !isMatch ) {
              userCreatedTags.push( selectedItem );
            }
          });

          const filteredItems = items
            .concat(
              allowNewTags && isString( inputValue, { ofMinLength: 1 })
                ? [inputValue] : [] )
            .concat( userCreatedTags )
            .filter( this.handleFilter( inputValue ));

          return (
            // WRAPPER
            <InputTagBody
              bodyProps={{
                ...getRootProps( undefined, { suppressRefError: true }),
                flexDirection: 'column',
              }}
              isOpen={isOpen}
              handleToggleMenu={handleToggleMenu}
            >
              {/* SELECTED TAGS CONTAINER */ }
              {
                allowMultipleSelection
                  ? (
                    <Box
                      flexWrap="wrap"
                      marginTop={10}
                      {...tagsWrapperProps}
                    >
                      {selectedItems.length > 0 && (
                        selectedItems.map( item => {
                          const itemString = isObject( item ) ? item[itemStringKey] : item;
                          const itemId = isObject( item ) ? item[itemValueKey] : item;
                          const itemObject = isObject( item )
                            ? item
                            : {
                              [itemStringKey]: itemString,
                              [itemValueKey]: itemId,
                            };
                          const onPress = () => {
                            removeItem( itemObject,  );
                            this.removeItemToPreSelection( itemObject );
                          };

                          return (
                            <InputTagItem
                              key={itemId}
                              renderProp={renderTag}
                              item={itemObject}
                              itemString={itemString}
                              touchableProps={getRemoveButtonProps({
                                withFeedback: true,
                                onPress: onPress,
                                style: {
                                  padding: 10,
                                },
                              })}
                              onPress={onPress}
                              testID={testID}
                            />
                          );
                        })
                      )}
                    </Box>
                  ) : null
              }

              {/* INPUT */ }
              <InputTagInputField
                inputProps={restProps}
                getInputProps={getInputProps}
                onPress={handleToggleMenu}
                isOpen={isOpen}
                inputValue={inputValue}
                onChangeValue={onInputValueChange}
                testID={testID}
                onFocusInput={() => {
                  // console.log( 'focus', this.state.focusing );
                  // if ( !this.state.focusing ) {
                  setHighlightedIndex( -1 );
                  handleOpenMenu();
                  // }
                  // this.handleInputFocus();
                }}
                onFocusTouchable={() => {
                  if ( this.inputs && this.inputs['input'] ) this.inputs['input'].focus();
                }}
                selectedItems={selectedItems}
                allowMultipleSelection={allowMultipleSelection}
                onRef={this.handleRef}
                onKeyPress={( key ) => {
                  this.handleKeyPress({
                    key,
                    setHighlightedIndex,
                    highlightedIndex,
                    maxIndex: filteredItems.length,
                    item: isInteger( highlightedIndex )
                      ? filteredItems[highlightedIndex]
                      : null,
                    selectMultipleItems,
                    handleCloseMenu,
                    handleOpenMenu,
                    isOpen,
                    selectItem,
                  });
                }}
              >

                {/* SUGGESTIONS CONTAINER */ }
                <InputTagSuggestionContainer
                  isOpen={isOpen}
                  onPressClose={handleToggleMenu}
                  onPressClear={clearSelection}
                  onPressItem={() => {
                    selectMultipleItems( this.state.preSelected );
                    handleToggleMenu();
                    clearSelection();
                  }}
                  inputValue={inputValue}
                  allowMultipleSelection={allowMultipleSelection}
                  inputProps={getInputProps({
                    type: 'text',
                    clearButtonMode: 'while-editing',
                    autoFocus: true,
                    paddingLeft: 50,
                    paddingY: 15,
                    width: '100%',
                    backgroundColor: 'transparent',
                    borderBottomWidth: 2,
                    borderColor: '#DDD',
                    borderStyle: 'solid',
                  })}
                >
                  {(
                    isArray( filteredItems ) ||
                    inputValue.length > 0
                  ) ? (
                      filteredItems
                      .map(( item, index ) => {
                        const itemString = isObject( item ) ? item[itemStringKey] : item;
                        const itemId = isObject( item ) ? item[itemValueKey] : item;
                        const itemObject = isObject( item )
                          ? item
                          : {
                            [itemStringKey]: itemString,
                            [itemValueKey]: itemId,
                          };
                        const isSelected = allowMultipleSelection
                          ? (
                            this.state.preSelected &&
                            this.state.preSelected.filter(
                              i => i[itemValueKey] === itemId
                            ).length > 0
                          )
                          : (
                            selectedItems &&
                            selectedItems.filter(
                              i => i[itemValueKey] === itemId
                            ).length > 0
                          );

                        return (
                          // RENDER SUGGESTION
                          <InputTagSuggestion
                            key={itemId}
                            renderProp={renderSuggestion}
                            item={itemObject}
                            itemString={itemString}
                            isSelected={isSelected}
                            isHighlighted={highlightedIndex === index}
                            getItemProps={getItemProps}
                            allowMultipleSelection={allowMultipleSelection}
                            functions={{
                              selectMultipleItems: selectMultipleItems,
                              addItemToPreSelection: this.addItemToPreSelection,
                              selectItem: selectItem,
                              clearSelection: clearSelection,
                              handleToggleMenu: handleToggleMenu,
                              handleCloseMenu: handleCloseMenu,
                            }}
                            testID={testID}
                            index={index}
                            onPress={() => {
                              this.handleSuggestionPress();
                            }}
                            onMouseEnter={() => {
                              setHighlightedIndex( index );
                            }}
                          />
                        );
                      })
                    ) : (
                      <Box
                        paddingX={15}
                        paddingY={10}
                        width="100%"
                        justifyContent="center"
                      >
                        <Text
                          align="center"
                          color="grey"
                          size="xs"
                        >
                          {inputValue.length > 0
                            ? 'No results'
                            : 'Please type...'
                        }
                        </Text>
                      </Box>
                    )}
                </InputTagSuggestionContainer>
              </InputTagInputField>
            </InputTagBody>
          );
        }}
      </MultiDownshift>
    );
  }
}

export default InputTag;
