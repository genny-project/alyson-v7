import React, { PureComponent } from 'react';
import { TextInput, Platform } from 'react-native';
import { string, oneOf, number, shape, bool, func, oneOfType, node, object } from 'prop-types';
import dlv from 'dlv';
// import memoize from 'memoize-one';
import { isObject, isString } from '../../../../utils';
import { Box, Text, Icon } from '../../../components';

/** Ensure the props we're going to use were indeed passed through. */
const filterOutUnspecifiedProps = props => {
  const keys = Object.keys( props );

  return keys.reduce(( filteredProps, prop ) => {
    if ( props[prop] != null )
      filteredProps[prop] = props[prop];

    return filteredProps;
  }, {});
};

const textSizes = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
};

class Input extends PureComponent {
  static defaultProps = {
    autoCapitalize: 'sentences',
    autoComplete: 'no',
    autoCorrect: true,
    autoFocus: false,
    blurOnSubmit: true,
    clearTextOnFocus: false,
    keyboardType: 'default',
    multiline: false,
    placeholder: 'Type here...',
    secureTextEntry: false,
    selectTextOnFocus: false,
    spellCheck: true,
    error: false,
    success: false,
    warning: false,
    textSize: 'xs',
    textAlign: 'left',
    prefixColor: 'grey',
    editable: true,
    outline: 'none',
  }

  static propTypes = {
    autoCapitalize: oneOf(
      ['characters', 'none', 'sentences', 'words']
    ),
    autoComplete: string,
    autoCorrect: bool,
    autoFocus: bool,
    blurOnSubmit: bool,
    clearTextOnFocus: bool,
    defaultValue: string,
    disabled: bool,
    keyboardType: oneOf(
      ['default', 'email-address', 'numeric', 'phone-pad', 'search', 'url', 'web-search']
    ),
    maxLength: number,
    multiline: bool,
    onBlur: func,
    onChange: func,
    onChangeValue: func,
    onChangeText: func,
    onChangeState: func,
    onFocus: func,
    onKeyPress: func,
    onLayout: func,
    onSelectionChange: func,
    onSubmitEditing: func,
    placeholder: string,
    secureTextEntry: bool,
    selection: shape({
      start: number,
      end: number,
    }),
    selectTextOnFocus: bool,
    spellCheck: bool,
    value: string,
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
    prefix: oneOfType(
      [string, node]
    ),
    suffix: oneOfType(
      [string, node]
    ),
    prefixColor: string,
    suffixColor: string,
    iconColor: string,
    textSize: oneOf(
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
    prefixIcon: string,
    editable: bool,
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
    borderSize: number,
    returnKeyLabel: string,
    returnKeyType: oneOf(
      ['done', 'next', 'go', 'search', 'send', 'default']
    ),
    prefixIconType: string,
    iconType: string,
    activeStyling: object,
    placeholderColor: string,
    activeProps: string,
    color: string,
    testID: string,
    characterCountWrapperProps: object,
    characterCountTextProps: object,
    showCharacterCount: bool,
    context: object,
    renderCharacterCount: object,
    name: string,
    cursor: string,
    useAttributeNameAsValue: bool,
    useQuestionNameAsValue: bool,
    question: object,
    outline: string,
    iconProps: object,
  }

  state = {
    isFocused: false,
    isHovering: false,
    valueLength: 0,
  }

  componentDidMount() {
    if ( this.props.value )
      this.setState({ valueLength: String( this.props.value ).length });
  }

  getStatusColor() {
    const { disabled, success, error, warning } = this.props;

    return disabled ? 'lightGrey'
      : success ? 'green'
      : error ? 'red'
      : warning ? 'yellow'
      : 'grey';
  }

  focus() {
    if ( this.input )
      this.input.focus();
  }

  blur() {
    if ( this.input )
      this.input.blur();
  }

  handleRef = input => {
    this.input = input;
  }

  handleChangeText = value => {
    if ( this.props.editable === false || this.props.disabled )
      return null;

    this.setState({
      valueLength: value.length,
    });

    if ( this.props.onChangeText )
      this.props.onChangeText( value );

    if ( this.props.onChangeValue )
      this.props.onChangeValue( value );
  }

  handleMouseOver = () => {
    this.setState({
      isHovering: true,
    });

    if ( this.props.onChangeState )
      this.props.onChangeState({ hover: true });
  }

  handleMouseOut = () => {
    this.setState({
      isHovering: false,
    });

    if ( this.props.onChangeState )
      this.props.onChangeState({ hover: false });
  }

  handleFocus = event => {
    if ( this.props.editable === false || this.props.disabled )
      return null;

    this.setState({
      isFocused: true,
    });

    // console.log( 'focus' );

    if ( this.props.onChangeState )
      this.props.onChangeState({ active: true });

    if ( this.props.onFocus )
      this.props.onFocus( event );
  }

  handleBlur = event => {
    if ( this.props.editable === false || this.props.disabled )
      return null;

    this.setState({
      isFocused: false,
    });

    if ( this.props.onChangeState )
      this.props.onChangeState({ active: false });

    if ( this.props.onBlur )
      this.props.onBlur( event );
  }

  render() {
    const {
      autoCapitalize,
      autoComplete,
      autoCorrect,
      autoFocus,
      blurOnSubmit,
      clearTextOnFocus,
      defaultValue,
      disabled,
      keyboardType,
      maxLength,
      multiline,
      onChange,
      onKeyPress,
      onLayout,
      onSelectionChange,
      onSubmitEditing,
      placeholder,
      secureTextEntry,
      selection,
      selectTextOnFocus,
      spellCheck,
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
      value,
      width,
      textSize,
      textAlign,
      height,
      editable,
      backgroundColor,
      borderWidth,
      borderTopWidth,
      borderRightWidth,
      borderBottomWidth,
      borderLeftWidth,
      borderColor,
      borderRadius,
      borderSize,
      returnKeyLabel,
      returnKeyType,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      placeholderColor,
      color,
      testID,
      showCharacterCount,
      characterCountWrapperProps,
      characterCountTextProps,
      useAttributeNameAsValue,
      useQuestionNameAsValue,
      outline,
      icon,
      iconProps,
    } = this.props;

    const { isFocused, isHovering, valueLength } = this.state; // eslint-disable-line no-unused-vars

    const hasIcon = isObject( iconProps ) && isString( icon, { ofMinLength: 1 });

    /* TODO: performance optimisation? */
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
      paddingLeft: paddingLeft || hasIcon ? 30 : null,
      fontSize: textSizes[textSize],
      textAlign: textAlign,
      height,
      width: '100%', // Always be 100% of the parent width
      backgroundColor,
      borderWidth,
      borderTopWidth,
      borderRightWidth,
      borderBottomWidth,
      borderLeftWidth,
      borderColor,
      borderRadius,
      borderSize,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      color,
      outline,
      ...editable === false ? { cursor: 'default' } : {},
    });

    const nativeProps = {
      onLayout,
    };

    const attributeName = dlv( this.props.question, 'attribute.name' );
    const questionName = dlv( this.props.question, 'name' );

    return (
      <Box
        position="relative"
        flex={1}
        width={width}
      >
        { hasIcon
          ? (
            <Box
              position="absolute"
              top={0}
              left={0}
              pointerEvents="none"
            >
              <Icon
                name="home"
                color="black"
                {...iconProps}
              />
            </Box>
          ) : null
        }
        <TextInput
          testID={`input-text ${testID}`}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          autoFocus={autoFocus}
          blurOnSubmit={blurOnSubmit}
          clearTextOnFocus={clearTextOnFocus}
          defaultValue={defaultValue}
          editable={(
            editable == null ? disabled : editable
          )}
          keyboardType={keyboardType}
          maxLength={maxLength}
          name={this.props.name}
          multiline={multiline}
          onChange={onChange}
          onChangeText={this.handleChangeText}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          onKeyPress={onKeyPress}
          onSelectionChange={onSelectionChange}
          onSubmitEditing={onSubmitEditing}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor || this.getStatusColor()}
          returnKeyLabel={!multiline ? returnKeyLabel : null}
          returnKeyType={!multiline ? returnKeyType : null}
          secureTextEntry={secureTextEntry}
          selection={selection}
          selectTextOnFocus={selectTextOnFocus}
          spellCheck={spellCheck}
          style={[
            inputStyle,
          ]}
          value={useAttributeNameAsValue
            ? attributeName
            : useQuestionNameAsValue
              ? questionName
              : value}
          underlineColorAndroid="transparent"
          {...Platform.select({
            ios: nativeProps,
            android: nativeProps,
          })}
          ref={this.handleRef}
        />

        {!showCharacterCount ? null : (
          <Box {...characterCountWrapperProps}>
            <Text {...characterCountTextProps}>
              {valueLength}
              {' / '}
              {maxLength}
            </Text>
          </Box>
        )}
      </Box>
    );
  }
}

export default Input;
