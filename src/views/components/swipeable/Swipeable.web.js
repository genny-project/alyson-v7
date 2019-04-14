import React, { Component, isValidElement } from 'react';
import { node } from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import SwipePagination from './swipe-pagination';
// import { isArray, Bridge, getDeviceSize } from '../../../utils';
import { Fragment } from '../index';

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
    index: 0,
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  render() {
    const {
      children,
      ...restProps
    } = this.props;

    const {
      index,
    } = this.state;

    const validChildren = React.Children.map( children, child => (
      isValidElement( child )
        ? React.cloneElement( child, {
          ...child.props,
          ...childProps,
        })
        : null
    ));

    return (
      <Fragment>
        <SwipeableViews
          {...restProps}
          index={index}
          onChangeIndex={this.handleChangeIndex}
          style={{
            height: '100%',
            width: '100%',
          }}
          containerStyle={{
            height: '100%',
          }}
          slideStyle={{
            overflowX: 'hidden',
          }}
        >
          {validChildren}
        </SwipeableViews>
        <SwipePagination
          dots={validChildren.length}
          index={index}
          onChangeIndex={this.handleChangeIndex}
        />
      </Fragment>
    );
  }
}

export default Swipeable;
