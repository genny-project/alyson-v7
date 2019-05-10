import React, { Component } from 'react';
import { number, bool, func, oneOf } from 'prop-types';
import dlv from 'dlv';
import { isString, isInteger } from '../../../../utils';
import { Input } from '../..';

const textSizes = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
};

class InputTextArea extends Component {
  static defaultProps = {
    textSize: 'xs',
  }

  static propTypes = {
    multiline: bool,
    numberOfLines: number,
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
    textSize: oneOf(
      ['xs','sm','md','lg','xl']
    ),
  }

  constructor( props ) {
    super( props );
    this.tempElement = document.createElement( 'span' );
  }

  state = {
    rows: null,
  }

  componentDidMount() {
    this.tempElement.setAttribute( 'id', 'textArea-tempElement' );
    document.body.appendChild( this.tempElement );
  }

  componentWillUnmount() {
    const hasNode = document.body.contains( this.tempElement );

    if ( hasNode )
      document.body.removeChild( this.tempElement );
  }

  handleChange = ( event ) => {
    const text = dlv( event, 'nativeEvent.text' );
    const clientWidth = dlv( event, 'nativeEvent.target.clientWidth' );

    const tempElementStyle = 'position: absolute; top: 0; left: 0; z-index: -1000; opacity: 0' ;
    const numberOfNewLines = [...text.matchAll( /\n/g )].length;

    this.tempElement.innerHTML = isString( text ) ? text : null;
    this.tempElement.setAttribute( 'style', `${isInteger( clientWidth ) ? `width: ${clientWidth}px;` : ''} ${tempElementStyle}` );

    const rowHeight = 3 + ( textSizes[this.props.textSize] || 14 );
    const minRows = this.props.numberOfLines;
    const contentHeight = this.tempElement.clientHeight;
    const totalRows = Math.ceil( contentHeight / rowHeight ) + numberOfNewLines;

    this.setState({
      rows: totalRows >= minRows ? totalRows : minRows,
    });
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
        {...restProps}
        multiline={multiline}
        numberOfLines={rows}
        onKeyPress={this.handleKeyPress}
        onLayout={this.handleLayout}
        overflow="hidden"
        // textSize="md"
        onChange={this.handleChange}
        type="text"
        ref={input => this.input = input}
        onChangeState={this.handleStateChange}
      />
    );
  }
}

export default InputTextArea;
