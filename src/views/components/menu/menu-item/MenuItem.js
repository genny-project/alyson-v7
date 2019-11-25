import React, { Component } from 'react';
import { node, func } from 'prop-types';
import MenuConsumer from '../consumer';

class MenuItem extends Component {
  static propTypes = {
    children: node.isRequired,
    onPress: func,
  }

  handlePress = ( event ) => {
    if ( this.props.onPress ) this.props.onPress( event );
  }

  render() {
    const { children, ...restProps } = this.props;

    return (
      <MenuConsumer>
        {({ handlePressItem }) => {
          return (
            children({
              ...restProps,
              handlePressItem,
            })
          );
        }}
      </MenuConsumer>
    );
  }
}

export default MenuItem;
