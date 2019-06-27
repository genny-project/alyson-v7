import React, { Component } from 'react';
import { func, string, number, oneOfType, array, bool, object } from 'prop-types';
import Downshift from 'downshift';
import { Text, Box, Input, Touchable } from '../../index';
import { isArray, isString, isObject, isInteger } from '../../../../utils';
import { SubcomponentThemeHandler } from '../../form/theme-handlers';

class InputAutocomplete extends Component {
  static defaultProps = {
    inputType: 'text',
    itemStringKey: 'name',
  }

  static propTypes = {
    children: func,
    handleFilter: func,
    handleSort: func,
    inputType: string,
    value: oneOfType(
      [number, string]
    ),
    defaultValue: oneOfType(
      [number, string]
    ),
    itemStringKey: string,
    itemValueKey: string,
    items: array,
    borderBetweenItems: bool,
    onChange: func,
    onChangeValue: func,
    onChangeState: func,
    onBlur: func,
    onType: func,
    testID: string,
    subcomponentProps: object,
    editable: bool,
    disabled: bool,
    error: string,
  }

  state = {
    filterValue: '',
    filteredItems: [],
  };

  componentDidUpdate( prevProps ) {
    if (
      this.state.filterValue === '' &&
      isString( this.props.value ) &&
      this.props.value !== prevProps.value
    ) {
      this.setFilterValue( this.props.value );
    }

    if (
      !isArray( prevProps.items ) ||
      !isArray( this.props.items ) ||
      prevProps.items.length !== this.props.items.length ||
      prevProps.items.some(( prevItem, index ) => {
        const isMatch = prevItem.place_id === this.props.items[index].place_id;

        return !isMatch;
      })
    ) {
      this.setFilteredItems( this.props.items );
    }
  }

  setFilterValue = ( value ) => {
    this.setState({ filterValue: value });
  }

  setFilteredItems = ( items ) => {
    const filteredItems = items.filter( this.handleFilter( this.state.filter )); // eslint-disable-line

    this.setState({ filteredItems: filteredItems });
  }

  handleFilter = ( inputValue ) => dropdownItem => {
    // return true;

    const { itemStringKey } = this.props;

    const noPunctuationRegex = /(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g; // eslint-disable-line

    let item = null;

    if ( isString( dropdownItem )) {
      item = dropdownItem;
    }
    else if ( isObject( dropdownItem )) {
      item = dropdownItem[itemStringKey];
    }

    // console.log( item );

    const isValid = !inputValue || item.replace( noPunctuationRegex ,'' ).toLowerCase().includes( inputValue.toLowerCase());

    // if ( shouldLog ) console.log( 'handleFilter', isValid, inputValue, dropdownItem, item );

    return isValid;
  }

  handleChange = item => {
    this.setState({
      filterValue: item.description,
    }, () => {
      if ( this.props.onChange )
        this.props.onChange( item );

      // if ( this.props.onChangeValue )
      //   this.props.onChangeValue( item );
    });
  }

  handleType = ( item ) => {
    // console.log( 'handleType', item );
    this.setState({
      filterValue: item,
    });
    if ( this.props.onType )
      this.props.onType( item );
  }

  handleKeyPress = ({
    event,
    setHighlightedIndex,
    highlightedIndex,
    maxIndex,
    item,
    selectItem,
    isOpen,
    openMenu,
  }) => {
    if ( !isOpen ) openMenu();
    const key = event.nativeEvent.key;
    const itemString = isObject( item ) ? item[this.props.itemStringKey] : item;
    const itemId = isObject( item ) ? item[this.props.itemValueKey] : item;
    const itemObject = isObject( item )
      ? item
      : {
        [this.props.itemStringKey]: itemString,
        [this.props.itemValueKey]: itemId,
      };

    if ( !isOpen ) return;

    switch ( key ) {
      case 'ArrowDown':
        setHighlightedIndex(
          highlightedIndex >= maxIndex || highlightedIndex == null
            ? 0 : highlightedIndex + 1
        );
        break;
      case 'ArrowUp':
        setHighlightedIndex(
          highlightedIndex <= 0 || highlightedIndex == null
            ? maxIndex : highlightedIndex - 1
        );
        break;
      case 'Enter':
        selectItem( itemObject );
        break;

      default:
        if ( maxIndex > 0 ) {
          setHighlightedIndex( 0 );
        }
    }
  }

  render() {
    const {
      inputType,
      items, // eslint-disable-line no-unused-vars
      itemStringKey,
      borderBetweenItems,
      onBlur,
      value, // eslint-disable-line no-unused-vars
      testID,
      onChange, // eslint-disable-line no-unused-vars
      ...restProps
    } = this.props;

    const { filteredItems } = this.state;

    // console.log( 'autocompprops', this.props && this.props.value );

    // console.log( 'props', this.props, restProps );

    return (
      <SubcomponentThemeHandler
        subcomponentProps={this.props.subcomponentProps}
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
            <Downshift
              defaultInputValue={(
                this.props.value ||
                this.props.defaultValue
              )}
              itemToString={item => (
                item == null ? ''
                : typeof item === 'string' ? item
                : item[itemStringKey]
              )}
              onChange={this.handleChange}
            >
              {({
                getRootProps,
                getItemProps,
                getInputProps,
                isOpen,
                selectedItem,
                inputValue,
                highlightedIndex,
                setHighlightedIndex,
                selectItem,
                openMenu,
              }) => {
                return (
                  <Box
                    {...getRootProps( undefined, { suppressRefError: true })}
                    position="relative"
                    flex={1}
                    testID={`input-autocomplete ${testID}`}
                    {...componentProps['input-wrapper']}
                  >
                    {/* autocomplete input field */}

                    <Input
                      {...getInputProps( restProps )}
                      type={inputType}
                      clearButtonMode="while-editing"
                      onChangeText={this.handleType}
                      onBlur={onBlur}
                      onKeyPress={( event ) => this.handleKeyPress({
                        event,
                        setHighlightedIndex,
                        highlightedIndex,
                        maxIndex: isArray( filteredItems, { ofMinLength: 1 })
                          ? filteredItems.length : null,
                        item: isInteger( highlightedIndex )
                          ? filteredItems[highlightedIndex]
                          : null,
                        selectItem,
                        isOpen,
                        openMenu,
                      })} // pass functions to update selected value and highlighted value
                      width="100%"
                      testID={`${testID}`}
                      value={this.state.filterValue}
                      blurOnSubmit
                      updateValueWhenFocused
                      onChangeState={( state ) => {
                        this.props.onChangeState( state );
                        updateState( 'input-field' );
                      }}
                      stateBasedProps={componentProps['input-field']}
                    />

                    {
                      isOpen &&
                      isString( inputValue, { ofMinLength: 1 }) &&
                      isArray( filteredItems ) && (
                      // autocomplete suggestion container
                      <Box
                        paddingY={5}
                        flexDirection="column"
                        position="absolute"
                        top="100%"
                        left={0}
                        width="100%"
                        backgroundColor="white"
                        borderRightWidth={2}
                        borderBottomWidth={2}
                        borderLeftWidth={2}
                        borderColor="#DDD"
                        borderStyle="solid"
                        zIndex={5}
                        {...componentProps['input-item-wrapper']}
                      >
                        {(
                          isArray( filteredItems, { ofMinLength: 1 })
                        ) ? (
                            filteredItems.map(( item, index ) => {
                              const idom = typeof item === 'string'
                                ? item
                                : item[itemStringKey];

                              // autocomplete suggestion item
                              return (
                                <Touchable
                                  {...getItemProps({ item: idom })}
                                  key={idom}
                                  onPress={() => selectItem( item )}
                                  withFeedback
                                  width="100%"
                                  testID={`input-autocomplete-item ${testID}`}
                                >
                                  <Box
                                    {...( highlightedIndex === index ) && {
                                      backgroundColor: '#DDD',
                                    }}
                                    padding={5}
                                    width="100%"
                                    {...(
                                      borderBetweenItems &&
                                      index > 0
                                    ) && {
                                    }}
                                    {...filterComponentProps( 'input-item', { hover: highlightedIndex === index })}
                                  >
                                    <Text
                                      {...( selectedItem === idom ) && {
                                        fontWeight: 'bold',
                                      }}
                                      {...filterComponentProps( 'input-item', { hover: highlightedIndex === index })}
                                    >
                                      {idom}
                                    </Text>
                                  </Box>
                                </Touchable>
                              );
                            })
                          ) : (
                            <Box
                              padding={5}
                            >
                              <Text>
                                No results
                              </Text>
                            </Box>
                          )}
                      </Box>
                      )}
                  </Box>
                );
              }}
            </Downshift>
          );
        }
      }
      </SubcomponentThemeHandler>
    );
  }
}

export default InputAutocomplete;
