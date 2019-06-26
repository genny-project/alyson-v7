import React, { Component, isValidElement } from 'react';
import { string, integer, node } from 'prop-types';
import queryString from 'query-string';
import { store } from '../../../redux';
import * as actions from '../../../redux/actions';

var timeoutMouseOverID;
var timeoutMouseOutID;

class TestIdHandler extends Component {
  static defaultProps = {
    testID: 'test-id',
    timer: 300,
  }

  static propTypes = {
    children: node,
    testID: string,
    timer: integer,
  }

  // Check if devMode is supplied as a query string in the URL
  isDebugMode() {
    if ( window ) {
      const paramsFromWindow = window.location.search;
      const values = queryString.parse( paramsFromWindow );

      if ( values && values.devMode === 'true' ) {
        store.dispatch( actions.setTestId({ id: this.props.testID }));
      }
    }
  }

  handleMouseOutDebounced = () => {
    window.clearTimeout( timeoutMouseOverID );

    timeoutMouseOutID = window.setTimeout(
      () => {
        this.handleMouseOut();
      },
      this.props.timer,
    );
  }

  handleMouseOverDebounced = () => {
    window.clearTimeout( timeoutMouseOutID );

    timeoutMouseOverID = window.setTimeout(
      () => {
        this.handleMouseOver();
      },
      this.props.timer,
    );
  }

  handleMouseOver = () => {
    this.isDebugMode ? store.dispatch( actions.setTestId({ id: this.props.testID })) : null;
  }

  handleMouseOut = () => {
    this.isDebugMode ? store.dispatch( actions.removeTestId()) : null;
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      React.Children.map( children, child => (
        isValidElement( child )
          ? React.cloneElement( child, {
            ...child.props,
            onMouseOver: this.handleMouseOverDebounced,
            onMouseOut: this.handleMouseOutDebounced,
          }) : null
      ))
    );
  }
}

export default TestIdHandler;
