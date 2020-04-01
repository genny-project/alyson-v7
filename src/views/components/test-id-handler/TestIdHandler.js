import React, { Component, isValidElement } from 'react';
import { string, node, number } from 'prop-types';
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
    timer: number,
  }

  handleMouseOutDebounced = () => {
    const { timer } = this.props;

    window.clearTimeout( timeoutMouseOverID );

    timeoutMouseOutID = window.setTimeout(
      () => {
        this.handleMouseOut();
      },
      timer,
    );
  }

  handleMouseOverDebounced = ( event ) => {
    const { timer } = this.props;

    event.stopPropagation();
    window.clearTimeout( timeoutMouseOutID );

    timeoutMouseOverID = window.setTimeout(
      () => {
        this.handleMouseOver( event );
      },
      timer,
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
