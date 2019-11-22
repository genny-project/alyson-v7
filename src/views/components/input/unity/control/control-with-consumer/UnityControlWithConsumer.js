import React, { Component } from 'react';
import { object, string, node } from 'prop-types';
import dlv from 'dlv';
import { isString, isObject } from '../../../../../../utils';
import UnityConsumer from '../../consumer';

class UnityControlWithConsumer extends Component {
  static propTypes = {
    unity: object,
    currentSceneCode: string,
    children: node,
  }

  componentDidUpdate( nextProps ) {
    const { unity } = this.props;
    const { currentSceneCode } = nextProps;

    console.warn({ progression: unity && unity.progression, progression2: dlv( this, 'props.unity.progression' ) });

    // 1. checking if scene needs to be set

    if (
      isString( currentSceneCode ) &&
      isObject( unity )
    ) {
      if (
        currentSceneCode !== unity.currentSceneCode &&
        unity.progression === 1
      ) {
        if ( unity.setScene ) {
          unity.setScene( currentSceneCode );
        }
      }
    }
  }

  render() {
    return this.props.children;
  }
}

export default props => (
  <UnityConsumer>
    { unity => (
      <UnityControlWithConsumer
        {...props}
        unity={unity}
      />
    )}
  </UnityConsumer>
);
