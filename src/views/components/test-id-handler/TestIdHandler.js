import React, { Component } from 'react';
import { string, integer, node } from 'prop-types';
import { store } from '../../../redux';
import * as actions from '../../../redux/actions';

var timeoutID;

class TestIdHandler extends Component {
  static defaultProps = {
    testID: 'test-id',
    debounce: 300,
  }

  static propTypes = {
    children: node,
    testID: string,
    debounce: integer,
  }

  handleMouseOverDebounced = () => {
    timeoutID = window.setTimeout(
      () => {
        this.handleMouseOver();
      },
      this.props.debounce,
    );
  }

  handleMouseOver = () => {
    if ( window.originalQueryParams.showcodes ) {
      store.dispatch( actions.setTestId({ id: this.props.testID }));
    }
  }

  handleMouseOut = () => {
    window.clearTimeout( timeoutID );
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
          onMouseOut: this.handleMouseOut,
        })
      ))
    );
  }
}

export default TestIdHandler;
