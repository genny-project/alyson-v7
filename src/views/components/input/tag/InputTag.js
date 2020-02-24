import React, { Component } from 'react';
import { string, func, array, bool, object, shape } from 'prop-types';
import { isString, isArray, isObject, isInteger } from '../../../../utils';
import { Box, MultiDownshift, Text } from '../../index';
import InputTagBody from './tag-body';
import InputTagInputField from './tag-input-field';
import InputTagItem from './tag-item';
import InputTagSuggestion from './tag-suggestion';
import InputTagSuggestionContainer from './tag-suggestion-container';
import { SubcomponentThemeHandler } from '../../form/theme-handlers';

class InputTag extends Component {
  static defaultProps = {
    placeholder: 'Add a tag...',
    items: [],
    itemStringKey: 'label',
    itemValueKey: 'value',
    itemIdKey: 'id',
    allowNewTags: true,
    allowInvalidSelection: false,
  }

  static propTypes = {
    placeholder: string,
    onChangeValue: func,
    items: array,
    itemStringKey: string,
    itemValueKey: string,
    itemIdKey: string,
    value: string,
    allowNewTags: bool,
    allowMultipleSelection: bool,
    allowInvalidSelection: bool,
    testID: string,
    onBlur: func,
    nonTabable: bool,
    subcomponentProps: shape({
      'input-field': object,
      'input-wrapper': object,
      'input-icon': object,
      'input-item-wrapper': object,
      'input-item': object,
      'input-selected-wrapper': object,
      'input-selected': object,
    }),
    editable: bool,
    disabled: bool,
    error: string,
  }

  inputs = {};

  state = {
    preSelected: [],
  }

  shouldComponentUpdate( nextProps ) {
    if ( nextProps.items !== this.props.items ) {
      return true;
    }

    return false;
  }

  itemToString = ( item ) => {
    return isObject( item ) ? item[this.props.itemStringKey] : item;
  }

  addItemToPreSelection = ( item, callback ) => {
    const { itemValueKey, allowInvalidSelection, items } = this.props;

    this.setState(
      ({ preSelected }) => ({
        preSelected: preSelected.filter( i => i[itemValueKey] === item[itemValueKey] ).length > 0
          ? preSelected
            .filter( v => (
              allowInvalidSelection
                ? true
                : items.filter( i  => {
                  return isObject( v )
                    ? i[itemValueKey] === v[itemValueKey]
                    : i[itemValueKey] === v;}
                ).length > 0
            ))
            .filter( i => i[itemValueKey] !== item[itemValueKey] )
          : [
            ...preSelected.filter( v => (
              allowInvalidSelection
                ? true
                : items.filter( i  => {
                  return isObject( v )
                    ? i[itemValueKey] === v[itemValueKey]
                    : i[itemValueKey] === v;}
                ).length > 0
            )),
            item,
          ],
      }), () => {
        if ( callback ) callback( this.state.preSelected );
      });
  }

  removeItemToPreSelection = ( item ) => {
    const { itemValueKey, allowInvalidSelection, items } = this.props;

    this.setState(
      ({ preSelected }) => ({
        preSelected: preSelected
        .filter( v => (
          allowInvalidSelection
            ? true
            : items.filter( i  => {
              return isObject( v )
                ? i[itemValueKey] === v[itemValueKey]
                : i[itemValueKey] === v;}
            ).length > 0
        ))
          .filter( i => i[itemValueKey] !== item[itemValueKey] ),
      })
    );
  }

  handleRef = ( ref, id ) => {
    if ( ref ) {
      this.inputs[id] = ref;
    }
  }

  handleChange = selectedItems => {
    const { allowInvalidSelection, items, itemValueKey, onChangeValue } = this.props;

    if ( onChangeValue ) {
      onChangeValue( selectedItems
        .filter( v => (
          allowInvalidSelection
            ? true
            : items.filter( i  => {
              return isObject( v )
                ? i[itemValueKey] === v[itemValueKey]
                : i[itemValueKey] === v;}
            ).length > 0
        ))
        .map( i => i[itemValueKey]
          ? i[itemValueKey]
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
    selectedItems,
    removeItem,
  }) => {
    const itemString = isObject( item ) ? item[this.props.itemStringKey] : item;
    const itemId = isObject( item ) ? item[this.props.itemValueKey] : item;
    const itemObject = isObject( item )
      ? item
      : item != null
        ? {
          [this.props.itemStringKey]: itemString,
          [this.props.itemValueKey]: itemId,
        }
        : null;

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
        if ( isObject( itemObject )) {
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
        }
        break;
      case 'Tab':
        if ( handleCloseMenu ) handleCloseMenu();
        break;

      case 'Backspace':
        if ( isArray( selectedItems, { ofMinLength: 1 }) && !this.props.allowMultipleSelection ) {
          removeItem( selectedItems[0] );
        }

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
      allowInvalidSelection,
      testID,
      onBlur, // eslint-disable-line no-unused-vars
      nonTabable,
      subcomponentProps,
      editable,
      ...restProps
    } = this.props;

    return (
       // STATE HOLDER
      <SubcomponentThemeHandler
        subcomponentProps={subcomponentProps}
        editable={this.props.editable}
        disabled={this.props.disabled}
        error={this.props.error}
      >
        {({
          componentProps,
          updateState,
          filterComponentProps,
        }) => {
          return (
            <MultiDownshift
              allowMultipleSelection={allowMultipleSelection}
              onChange={this.handleChange}
              itemToString={this.itemToString}
              selectedItems={
                isArray( value )
                  ? value
                    .filter( v => {
                      return allowInvalidSelection
                        ? true
                        : items.filter( i  => {
                          return isObject( v )
                            ? i[itemValueKey] === v[itemValueKey]
                            : i[itemValueKey] === v;}
                        ).length > 0;
                    })
                    .map( v => {
                      const item = isObject( v )
                        ? items.filter( i => i[itemValueKey] === v[itemValueKey] ).length > 0
                          ? items.filter( i => i[itemValueKey] === v[itemValueKey] )[0]
                          : v
                        : items.filter( i => i[itemValueKey] === v ).length > 0
                          ? items.filter( i => i[itemValueKey] === v )[0]
                          : { [itemStringKey]: v, [itemValueKey]: v }
                          ;

                      return item;
                    })
                  : []
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

                  if ( !isMatch && allowInvalidSelection ) {
                    userCreatedTags.push( selectedItem );
                  }
                });

                const filteredItems = items
                  .concat(
                    allowNewTags && isString( inputValue, { ofMinLength: 1 })
                      ? [inputValue] : [] )
                  .concat( userCreatedTags )
                  .filter( this.handleFilter( inputValue ));
                  // .slice( 0, 10 );

                const { onRef, restRootProps } = getRootProps({ refKey: 'onRef' });

                return (
                  // WRAPPER
                  <InputTagBody
                    bodyProps={{
                      ...restRootProps,
                      flexDirection: 'column',
                      ...componentProps['input-wrapper'],
                    }}
                    onRef={onRef}
                    componentID="INPUT-WRAPPER"
                    isOpen={isOpen}
                    handleToggleMenu={handleToggleMenu}
                  >
                    {/* SELECTED TAGS CONTAINER */ }
                    {
                      allowMultipleSelection
                        ? (
                          <Box
                            flexWrap="wrap"
                            // marginTop={10}
                            componentID="INPUT-SELECTED-WRAPPER"
                            {...componentProps['input-selected-wrapper']}
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
                                    editable={editable}
                                    key={itemId}
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
                                    stateBasedProps={
                                      ({ active, hover }) => filterComponentProps( 'input-selected', { active, hover })
                                    }
                                  />
                                );
                              })
                            )}
                          </Box>
                        ) : null
                    }

                    {
                      editable ? (
                        <InputTagInputField
                          {...restProps}
                          // inputProps={restProps}
                          getInputProps={getInputProps}
                          onPress={handleToggleMenu}
                          isOpen={isOpen}
                          inputValue={inputValue}
                          onChangeValue={onInputValueChange}
                          testID={testID}
                          onFocusInput={() => {
                            setHighlightedIndex( -1 );
                            handleOpenMenu();
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
                              removeItem,
                              selectedItems,
                            });
                          }}
                          nonTabable={nonTabable}
                          iconProps={componentProps['input-icon']}
                          stateBasedProps={componentProps['input-field']}
                          onChangeState={updateState( 'input-field' )}
                        >

                          {/* SUGGESTIONS CONTAINER */ }

                          <InputTagSuggestionContainer
                            isOpen={isOpen}
                            {...componentProps['input-item-wrapper']}
                          >
                            {(
                              isArray( filteredItems ) ||
                                inputValue.length > 3
                            ) ? (
                                filteredItems
                                  .map(( item, index ) => {
                                    const itemString = isObject( item )
                                      ? item[itemStringKey]
                                      : item;
                                    const itemId = isObject( item )
                                      ? item[itemValueKey]
                                      : item;
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
                                        item={itemObject}
                                        itemId={itemId}
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
                                        // onChangeState={updateState( 'input-item' )}
                                        stateBasedProps={
                                          filterComponentProps( 'input-item', { selected: isSelected, hover: highlightedIndex === index })
                                        }
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
                      ) : null
                    }

                  </InputTagBody>
                );
              }}
            </MultiDownshift>
          );
        }
      }
      </SubcomponentThemeHandler>
    );
  }
}

export default InputTag;
