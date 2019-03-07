import React, { Component, isValidElement } from 'react';
import { node } from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
// import { isArray, Bridge, getDeviceSize } from '../../../utils';
// import { Icon, Box, Text } from '..';

const childProps = {
  flexDirection: 'column',
  height: '100%',
  width: '100vw',
};

class Swipeable extends Component {
  static defaultProps = {

  }

  static propTypes = {
    children: node,
  }

  state = {

  }

  render() {
    const {
      children,
      ...restProps
    } = this.props;

    // const {

    // } = this.state;

    return (
      <SwipeableViews
        {...restProps}
        style={{
          height: '100%',
        }}
        containerStyle={{
          height: '100%',
        }}
        slideStyle={{
        }}
      >
        {React.Children.map( children, child => (
          isValidElement( child )
            ? React.cloneElement( child, {
              ...child.props,
              ...childProps,
            })
            : null
        ))}
      </SwipeableViews>
    );
  }
}

export default Swipeable;
