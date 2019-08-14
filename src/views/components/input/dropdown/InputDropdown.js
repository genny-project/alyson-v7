import React, { Component, Fragment } from 'react';
import { Picker } from 'react-native';
import { oneOfType, arrayOf, string, any, shape, number, func, bool, oneOf } from 'prop-types';
// import memoize from 'memoize-one';
import { TEXT_SIZES } from '../../../../constants';
import { isArray, isObject, sort } from '../../../../utils';

/** Ensure the props we're going to use were indeed passed through. */
const filterOutUnspecifiedProps = props => {
  const keys = Object.keys( props );

  return keys.reduce(( filteredProps, prop ) => {
    if ( props[prop] != null )
      filteredProps[prop] = props[prop];

    return filteredProps;
  }, {});
};

class InputDropdown extends Component {
  static defaultProps = {
    itemStringKey: 'label',
    itemValueKey: 'value',
    itemIdKey: 'id',
    placeholder: 'Please select...',
  }

  static propTypes = {
    value: any,
    onChangeValue: func,
    itemStringKey: string,
    itemValueKey: string,
    itemIdKey: string,
    placeholder: string,
    disabled: bool,
    items: oneOfType(
      [
        arrayOf( string ),
        arrayOf(
          shape({
            label: string.isRequired,
            value: oneOfType(
              [number, string]
            ).isRequired,
            color: string,
            testID: string,
          })
        ),
      ]
    ).isRequired,
    margin: number,
    marginX: number,
    marginY: number,
    marginTop: number,
    marginRight: number,
    marginBottom: number,
    marginLeft: number,
    error: bool,
    success: bool,
    warning: bool,
    icon: string,
    padding: number,
    paddingX: number,
    paddingY: number,
    paddingTop: number,
    paddingRight: number,
    paddingBottom: number,
    paddingLeft: number,
    size: oneOf(
      ['xs','sm','md','lg','xl']
    ),
    textAlign: oneOf(
      ['left', 'center','right']
    ),
    height: oneOfType(
      [string, number]
    ),
    width: oneOfType(
      [string, number]
    ),
    backgroundColor: string,
    borderWidth: number,
    borderTopWidth: number,
    borderRightWidth: number,
    borderBottomWidth: number,
    borderLeftWidth: number,
    borderColor: string,
    borderRadius: number,
    borderBottomLeftRadius: number,
    borderBottomRightRadius: number,
    borderTopLeftRadius: number,
    borderTopRightRadius: number,
    returnKeyLabel: string,
    prefixIconType: string,
    iconType: string,
    placeholderColor: string,
    color: string,
    appearance: string,
    sortByWeight: bool,
    testID: string,
  }

  componentDidMount() {
    if ( this.props.appearance === 'none' ) {
      this.injectNativeProps({
        'data-appearance-none': true,
      });
    }
  }

  shouldComponentUpdate( nextProps ) {
    if ( nextProps.value !== this.props.value )
      return true;

    if ( nextProps.items !== this.props.items )
      return true;

    return false;
  }

  injectNativeProps( nativeProps ) {
    if ( !this.picker ) return;
    if ( !this.picker.setNativeProps ) return;

    this.picker.setNativeProps( nativeProps );
  }

  handleChange = value => {
    const { placeholder } = this.props;

    if ( value === placeholder )
      return;

    if ( this.props.onChangeValue )
      this.props.onChangeValue( value );
  }

  render() {
    const {
      items,
      itemStringKey,
      itemValueKey,
      itemIdKey,
      disabled,
      placeholder,
      margin,
      marginX,
      marginY,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      size,
      textAlign,
      height,
      backgroundColor,
      borderWidth,
      borderTopWidth,
      borderRightWidth,
      borderBottomWidth,
      borderLeftWidth,
      borderColor,
      borderRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      color,
      testID,
      ...restProps
    } = this.props;

    const { value } = this.props;

    const inputStyle = filterOutUnspecifiedProps({
      margin,
      marginHorizontal: marginX,
      marginVertical: marginY,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      padding,
      paddingHorizontal: paddingX,
      paddingVertical: paddingY,
      paddingTop: paddingTop,
      paddingRight: paddingRight,
      paddingBottom,
      paddingLeft,
      fontSize: TEXT_SIZES[size],
      textAlign: textAlign,
      height,
      // width: '100%', // Always be 100% of the parent width
      backgroundColor,
      borderWidth,
      borderTopWidth,
      borderRightWidth,
      borderBottomWidth,
      borderLeftWidth,
      borderColor,
      borderRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      color,
      flex: 1,
    });

    const validItems = isArray( items, { ofMinLength: 1 });
    const uniqueItems = [];

    items.forEach( item => {
      if ( uniqueItems.filter( x => x.label === item.label ).length === 0 ) {
        uniqueItems.push( item );
      }
    });

    return (
      <Picker
        {...restProps}
        enabled={!disabled && validItems}
        onValueChange={this.handleChange}
        selectedValue={value || placeholder}
        style={inputStyle}
        testID={`input-dropdown ${testID}`}
        ref={picker => this.picker = picker}
      >
        {validItems ? (
          <Fragment>
            {placeholder ? (
              <Picker.Item
                label={placeholder}
                disabled
                hidden
              />
            ) : null}

            {
              sort( uniqueItems, { paths: ['weight'], direction: 'desc' })
                .map( item => {
                  const isItemObject = isObject( item );

                  return (
                    <Picker.Item
                      key={(
                        isItemObject
                          ? ( item[itemIdKey] || item[itemStringKey] )
                          : item
                      )}
                      testID={`input-dropdown-option ${testID}`}
                      label={isItemObject ? item[itemStringKey] : item}
                      value={isItemObject ? item[itemValueKey] : item}
                    />
                  );
                })
            }
          </Fragment>
        ) : (
          <Picker.Item
            label="No items to show"
            hidden
          />
        )}
      </Picker>
    );
  }
}

export default InputDropdown;
