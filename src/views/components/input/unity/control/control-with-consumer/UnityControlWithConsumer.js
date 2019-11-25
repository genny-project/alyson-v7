import React, { Component } from 'react';
import { object, string, node } from 'prop-types';
import { isString, isObject } from '../../../../../../utils';
import UnityConsumer from '../../consumer';

class UnityControlWithConsumer extends Component {
  static propTypes = {
    unity: object,
    currentSceneCode: string,
    children: node,
    questionCode: string,
    ask: object,
    valuePath: string,
  }

  componentDidMount() {
    this.checkIfSetSceneRequired( this.props );
  }

  componentDidUpdate( nextProps ) {
    // console.warn( this.props.questionCode, 'did update' );

    this.checkIfSetSceneRequired( nextProps ) ;
  }

  componentWillUnmount() {
    const { unity, currentSceneCode } = this.props;

    if (
      isObject( unity, { withProperty: 'unsetScene' }) &&
      isString( currentSceneCode )
    ) {
      // console.warn( this.props.questionCode, 'unset' );

      unity.unsetScene( this.props.questionCode );
    }
  }

  checkIfSetSceneRequired = ( props ) => {
    const { unity, ask, valuePath, questionCode } = this.props;
    const { currentSceneCode } = props;

    // console.warn( this.props.questionCode, { unity, currentSceneCode });

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
          unity.setScene({
            questionCode,
            sceneCode: currentSceneCode,
            ask,
            valuePath,
          });
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
