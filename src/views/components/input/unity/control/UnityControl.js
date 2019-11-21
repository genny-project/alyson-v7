import React, { Component } from 'react';
import { object } from 'prop-types';
import dlv from 'dlv';
import { isArray, isString, isObject } from '../../../../../utils';
import UnityConsumer from '../../../input/unity/consumer';

class UnityControl extends Component {
  static defaultProps = {
  }

  static propTypes = {
    unity: object,
    asks: object,
  }

  componentDidUpdate( nextProps ) {
    const { unity } = this.props;

    const askLinks = dlv( nextProps, `asks.${nextProps.ask.questionCode}.links` );

    console.warn({ askLinks, asks: nextProps.asks, nextProps, progression: unity && unity.progression, progression2: dlv( this, 'props.unity.progression' ) });

    if ( isObject( unity )) {
      if ( isArray( askLinks, { ofMinLength: 1 })) {
        askLinks.filter( link => link.type === 'unity' );

        if ( isArray( askLinks, { ofMinLength: 1 })) {
          const { sceneCode } = askLinks[0];

          if ( isString( sceneCode )) {
            if ( sceneCode !== unity.currentSceneCode ) {
              if ( unity.progression === 1 ) {
                this.updateScene( sceneCode, unity.setScene );
              }
            }
          }
        }
      }
    }
  }

  updateScene = ( sceneCode, callback ) => {
    console.warn( 'updateScene', sceneCode, callback );
    if ( callback )
      callback( sceneCode );
  }

  render() {
    const { children } = this.props; // eslint-disable-line

    // console.warn({ ...this.props.unity });

    return children;
  }
}

export default props => (
  <UnityConsumer>
    { unity => (
      <UnityControl
        {...props}
        unity={unity}
      />
    )}
  </UnityConsumer>
);
