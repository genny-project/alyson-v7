import React, { Component } from 'react';
import { node, func,integer } from 'prop-types';
import { Touchable } from '../../index';
import MenuConsumer from '../consumer';

class MenuItem extends Component {
  static propTypes = {
    children: node.isRequired,
    onPress: func,
    id: integer,
  }

  // handleFocus = () => {
  //   console.log( 'handle focus' );
  // }

  // handleBlur = () => {
  //   console.log( 'handle blur' );
  // }

  handlePress = () => {
    if ( this.props.onPress ) this.props.onPress();
  }

  render() {
    const { children, id } = this.props;

    return (
      <MenuConsumer>
        {({ setRef, handlePressItem }) => {
          return (
            <Touchable
              withFeedback
              onPress={handlePressItem}
              onRef={ref => setRef( ref, id )}
            >
              {children}
            </Touchable>
          );
        }}
      </MenuConsumer>
    );
  }
}

export default MenuItem;
