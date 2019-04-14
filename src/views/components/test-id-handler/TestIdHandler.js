import React, { Component } from 'react';
import { string, integer, node } from 'prop-types';
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

  handleMouseOverDebounced = () => {
    window.clearTimeout( timeoutMouseOutID );

    timeoutMouseOverID = window.setTimeout(
      () => {
        this.handleMouseOver();
      },
      this.props.timer,
    );
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

  handleMouseOver = () => {
    if ( window.originalQueryParams.showcodes ) {
      store.dispatch( actions.setTestId({ id: this.props.testID }));
    }
  }

  handleMouseOut = () => {
    if ( window.originalQueryParams.showcodes ) {
      store.dispatch( actions.removeTestId());
    }
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      React.Children.map( children, child => (
        React.cloneElement( child, {
          ...child.props,
          onMouseOver: this.handleMouseOverDebounced,
          onMouseOut: this.handleMouseOutDebounced,
        })
      ))
    );
  }
}

export default TestIdHandler;
