import React, { Component } from 'react';
import { number, bool, func, oneOf, string, object } from 'prop-types';
import dlv from 'dlv';
import { TEXT_SIZES, LINE_HEIGHTS } from '../../../../constants';
import { isString, isInteger } from '../../../../utils';
import { Input } from '../..';

class InputTextArea extends Component {
  static defaultProps = {
    // size: 'xs',
    size: 'xxs',
  }

  static propTypes = {
    multiline: bool,
    numberOfLines: number,
    onBlur: func,
    onChange: func,
    onChangeValue: func,
    onChangeState: func,
    onFocus: func,
    onKeyPress: func,
    onLayout: func,
    onSelectionChange: func,
    onSubmitEditing: func,
    size: oneOf(
      ['xs','sm','md','lg','xl']
    ),
    value: string,
    ask: object,
    fontFamily: string,
  }

  constructor( props ) {
    super( props );
    this.tempElement = document.createElement( 'span' );
  }

  state = {
    rows: null,
    clientWidth: null,
    value: null,
  }

  componentDidMount() {
    this.tempElement.setAttribute( 'id', 'textArea-tempElement' );
    document.body.appendChild( this.tempElement );
  }

  componentDidUpdate( prevProps ) {
    if (
      prevProps.value !== this.props.value
    ) {
      this.updateWidth({ text: this.props.value, clientWidth: this.state.clientWidth  });
    }
  }

  componentWillUnmount() {
    const hasNode = document.body.contains( this.tempElement );

    if ( hasNode )
      document.body.removeChild( this.tempElement );
  }

  updateWidth = ({ text, clientWidth }) => {
    if (
      !isString( text ) &&
      !isInteger( text )
    ) {
      console.error( 'Error: invalid data type. "text" should be `string` or `integer`' );

      this.setState({
        rows: minRows,
      });

      return;
    }
    const { size, fontFamily } = this.props;

    // const tempElementStyle = 'position: absolute; top: 0; left: 0; margin: 0; white-space: pre-wrap; z-index: -1000; opacity: 0' ;
    const tempElementStyle = `${isInteger( clientWidth ) ? `width: ${clientWidth}px;` : ''} font-size: ${TEXT_SIZES[size]}px; font-family: ${fontFamily}; position: absolute; top: 0; left: 0; margin: 0; word-wrap: break-word; white-space: pre-line; z-index: 1000`;

    const isEndOfStringNewLine = [...text.toString().matchAll( /\n$/g )].length > 0;

    this.tempElement.innerHTML = isString( text ) ? text : null;
    this.tempElement.setAttribute( 'style', tempElementStyle );

    const rowHeight = LINE_HEIGHTS[size]; // calculating lineheight
    const minRows = this.props.numberOfLines;
    // const contentHeight = this.tempElement.clientHeight;
    const contentHeight = this.tempElement.clientHeight;
    const totalRows = Math.ceil( contentHeight / rowHeight ) + ( isEndOfStringNewLine ? 1 : 0 );

    this.setState({
      rows: totalRows >= minRows ? totalRows : minRows,
      clientWidth,
      value: this.tempElement.innerHTML,
    });
  }

  handleChange = ( event ) => {
    const text = dlv( event, 'nativeEvent.text' );
    const clientWidth = dlv( event, 'nativeEvent.target.clientWidth' );

    this.updateWidth({ text, clientWidth });
  }

  // handleLayout = ( event ) => {
  //   // console.warn( '-----------------------------' );
  //   console.warn( 'HANDLE LAYOUT' );
  //   console.warn( '-----------------------------' );
  //   // console.warn( '-----------------------------' );
  //   const text = this.props.value;
  //   // const text = null;
  //   const clientWidth = dlv( event, 'nativeEvent.target.clientWidth' );

  //   if ( isString( text )) {
  //     this.updateWidth({ text, clientWidth });
  //   }
  // }

  render() {
    const {
      multiline,
      ...restProps
    } = this.props;

    const {
      rows,
    } = this.state;

    return (
      <Input
        blurOnSubmit={false}
        value={this.state.value}
        {...restProps}
        multiline={multiline}
        numberOfLines={rows}
        onLayout={this.handleLayout}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        overflow="hidden"
        onChange={this.handleChange}
        type="text"
        ref={input => this.input = input}
        onChangeState={this.props.onChangeState}
      />
    );
  }
}

export default InputTextArea;
