import React, { Component } from 'react';
import { node } from 'prop-types';
import MenuConsumer from '../consumer';
import { isObject } from '../../../../utils';

class MenuItem extends Component {
  static propTypes = {
    children: node.isRequired,
  }

  render() {
    const { children } = this.props;

    return (
      <MenuConsumer>
        {( props ) => {
          return (
            React.cloneElement( children, {
              ...children.props,
              onPress: isObject( props, { withProperty: 'handlePressItem' }) ? props.handlePressItem : null,
            })
          );
        }}
      </MenuConsumer>
    );
  }
}

export default MenuItem;
