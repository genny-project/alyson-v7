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

  handlePress = ( event ) => {
    if ( this.props.onPress ) this.props.onPress( event );
  }

  render() {
    const { children, id, ...restProps } = this.props;

    return (
      <MenuConsumer>
        {({ setRef, handlePressItem }) => {
          return (
            <Touchable
              {...restProps}
              withFeedback
              onPress={event => {
                handlePressItem();
                this.handlePress( event );
              }}
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
