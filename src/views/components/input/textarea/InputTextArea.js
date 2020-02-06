import React, { Component } from 'react';
import { number, bool, func, oneOf, string } from 'prop-types';
import dlv from 'dlv';
import { TEXT_SIZES } from '../../../../constants';
import { isString, isInteger } from '../../../../utils';
import { Input } from '../..';

class InputTextArea extends Component {
  static defaultProps = {
    size: 'xs',
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

  }

  constructor( props ) {
    super( props );
    this.tempElement = document.createElement( 'span' );
  }

  state = {
    rows: null,
    clientWidth: null,
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
    const tempElementStyle = 'position: absolute; top: 0; left: 0; z-index: -1000; opacity: 0' ;
    const numberOfNewLines = text != null ? [...text.matchAll( /\n/g )].length : 0;

    this.tempElement.innerHTML = isString( text ) ? text : null;
    this.tempElement.setAttribute( 'style', `${isInteger( clientWidth ) ? `width: ${clientWidth}px;` : ''} ${tempElementStyle}` );

    const rowHeight = 3 + ( TEXT_SIZES[this.props.size] || 14 );
    const minRows = this.props.numberOfLines;
    const contentHeight = this.tempElement.clientHeight;
    const totalRows = Math.ceil( contentHeight / rowHeight ) + numberOfNewLines;

    this.setState({
      rows: totalRows >= minRows ? totalRows : minRows,
      clientWidth,
    });
  }

  handleChange = ( event ) => {
    const text = dlv( event, 'nativeEvent.text' );
    const clientWidth = dlv( event, 'nativeEvent.target.clientWidth' );

    this.updateWidth({ text, clientWidth });
  }

  handleLayout = ( event ) => {
    const text = this.props.value;
    const clientWidth = dlv( event, 'nativeEvent.target.clientWidth' );

    if ( isString( text )) {
      this.updateWidth({ text, clientWidth });
    }
  }

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
        {...restProps}
        multiline={multiline}
        numberOfLines={rows}
        onKeyPress={this.handleKeyPress}
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
