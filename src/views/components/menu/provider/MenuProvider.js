/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { node, object } from 'prop-types';
import MenuContext from '../context';

class MenuProvider extends Component {
  static propTypes = {
    children: node,
    value: object,
  }

  render() {
    return (
      <MenuContext.Provider value={{ ...this.props.value  }}>
        {this.props.children}
      </MenuContext.Provider>
    );
  }
}

export default MenuProvider;
