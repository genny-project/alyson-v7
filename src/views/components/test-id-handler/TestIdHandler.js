import React, { Component, isValidElement } from 'react';
import { string, integer, node } from 'prop-types';
import { store } from '../../../redux';
import * as actions from '../../../redux/actions';
import { isDevMode } from '../../../utils';

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
    store.dispatch( actions.setTestId({ id: this.props.testID }));
  }

  handleMouseOut = () => {
    store.dispatch( actions.removeTestId());
  }

  render() {
    const {
      children,
    } = this.props;

    if ( !isDevMode()) {
      return children;
    }

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
