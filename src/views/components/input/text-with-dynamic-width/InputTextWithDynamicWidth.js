import React, { Component } from 'react';
import { number, string, func, oneOf, oneOfType, bool } from 'prop-types';
import dlv from 'dlv';
import { TEXT_SIZES } from '../../../../constants';
import { isString, isInteger } from '../../../../utils';
import { Input, Fragment } from '../..';

class InputTextWithDynamicWidth extends Component {
  static defaultProps = {
    textSize: 'xs',
  }

  static propTypes = {
    onBlur: func,
    onChange: func,
    onChangeValue: func,
    onChangeState: func,
    onFocus: func,
    onKeyPress: func,
    onSelectionChange: func,
    onSubmitEditing: func,
    textSize: oneOf(
      ['xs','sm','md','lg','xl']
    ),
    dynamicWidth: bool,
    width: oneOfType(
      [string, number]
    ),
    placeholder: string,
    value: string,
    margin: number,
    marginX: number,
    marginLeft: number,
    marginRight: number,
    padding: number,
    paddingX: number,
    paddingLeft: number,
    paddingRight: number,
  }

  constructor( props ) {
    super( props );
    this.tempElement = document.createElement( 'span' );
  }

  state = {
    calculatedWidth: null,
  }

  componentDidMount() {
    this.tempElement.setAttribute( 'id', 'fitText-tempElement' );
    document.body.appendChild( this.tempElement );

    // element needs to be created here
    this.updateWidth( this.props.value );
  }

  componentDidUpdate( prevProps ) {
    if (
      prevProps.value !== this.props.value
    ) {
      this.updateWidth( this.props.value );
    }
  }

  componentWillUnmount() {
    const hasNode = document.body.contains( this.tempElement );

    if ( hasNode )
      document.body.removeChild( this.tempElement );
  }

  updateWidth = ( text ) => {
    const {
      margin,
      marginX,
      marginLeft,
      marginRight,
      padding,
      paddingX,
      paddingLeft,
      paddingRight,
      placeholder,
    } = this.props;

    const tempElementStyle = `position: absolute; top: 0; left: 0; z-index: -1000; opacity: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif; font-size: ${TEXT_SIZES[this.props.textSize]}px; white-space: pre-wrap;` ;

    this.tempElement.innerHTML = (
      isString( text, { ofMinLength: 1 }) ||
      isInteger( text, { ofMinLength: 1 })
    ) ? text : placeholder;
    this.tempElement.setAttribute( 'style', `${tempElementStyle}` );
    const contentWidth = this.tempElement.clientWidth;

    let offsetMarginLeft = 0;
    let offsetMarginRight = 0;
    let offsetPaddingLeft = 0;
    let offsetPaddingRight = 0;

    if ( isInteger( margin )) {
      offsetMarginLeft = margin;
      offsetMarginRight = margin;
    }
    if ( isInteger( marginX )) {
      offsetMarginLeft = marginX;
      offsetMarginRight = marginX;
    }
    if ( isInteger( marginLeft )) {
      offsetMarginLeft = marginLeft;
    }
    if ( isInteger( marginRight )) {
      offsetMarginRight = marginRight;
    }
    if ( isInteger( padding )) {
      offsetPaddingLeft = padding;
      offsetPaddingRight = padding;
    }
    if ( isInteger( paddingX )) {
      offsetPaddingLeft = paddingX;
      offsetPaddingRight = paddingX;
    }
    if ( isInteger( paddingLeft )) {
      offsetPaddingLeft = paddingLeft;
    }
    if ( isInteger( paddingRight )) {
      offsetPaddingRight = paddingRight;
    }

    const calculatedWidth = contentWidth > 0
      ? contentWidth + 1 +
        offsetMarginLeft + offsetMarginRight + offsetPaddingLeft + offsetPaddingRight
      : null;

    if ( calculatedWidth !== this.state.calculatedWidth ) {
      this.setState({
        calculatedWidth: calculatedWidth,
      });
    }
  };

  handleChange = ( event ) => {
    const text = dlv( event, 'nativeEvent.text' );

    this.updateWidth( text );
  }

  render() {
    const {
      dynamicWidth, // eslint-disable-line no-unused-vars
      width, // eslint-disable-line no-unused-vars
      ...restProps
    } = this.props;

    const {
      calculatedWidth,
    } = this.state;

    return (
      <Fragment>
        <Input
          blurOnSubmit={false}
          width={calculatedWidth}
          maxWidth="100%"
          {...restProps}
          // wordWrap="break-word"
          // wordBreak="break-all;
          overflow="hidden"
          onChange={this.handleChange}
          type="text"
          ref={input => this.input = input}
          onChangeState={this.props.onChangeState}
        />
      </Fragment>
    );
  }
}

export default InputTextWithDynamicWidth;
