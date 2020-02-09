/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { node, object } from 'prop-types';
import UnityContext from '../context';

class UnityProvider extends Component {
  static propTypes = {
    children: node,
    value: object,
  }

  render() {
    return (
      <UnityContext.Provider
        value={{ ...this.props.value  }}
      >
        {this.props.children}
      </UnityContext.Provider>
    );
  }
}

export default UnityProvider;
