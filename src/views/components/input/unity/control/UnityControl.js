import React, { Component } from 'react';
import { object } from 'prop-types';
import dlv from 'dlv';
import { isArray, isString } from '../../../../../utils';
import UnityControlWithConsumer from './control-with-consumer';

class UnityControl extends Component {
  static propTypes = {
    asks: object,
  }

  state = {
    currentSceneCode: null,
  }

  componentDidUpdate( nextProps ) {
    const { currentSceneCode } = this.state;

    const askLinks = dlv( nextProps, `asks.${nextProps.ask.questionCode}.links` );

    console.warn({ askLinks, asks: nextProps.asks, nextProps });

    // 1. checking if there is a unity config link

    if ( isArray( askLinks, { ofMinLength: 1 })) {
      askLinks.filter( link => link.type === 'unity' );

      if ( isArray( askLinks, { ofMinLength: 1 })) {
        const { sceneCode } = askLinks[0];

        // 2. checking if the sceneCode is different from the one saved in the state
        if (
          isString( sceneCode ) && (
            !isString( currentSceneCode ) ||
            currentSceneCode !== sceneCode
          )
        ) {
          this.updateSceneCode( sceneCode );
        }
      }
    }
  }

  updateSceneCode = ( code ) => {
    this.setState({
      currentSceneCode: code,
    });
  }

  render() {
    const { children } = this.props; // eslint-disable-line
    const { currentSceneCode } = this.state;

    if ( isString( currentSceneCode )) {
      return (
        <UnityControlWithConsumer
          currentSceneCode={currentSceneCode}
        >
          {children}
        </UnityControlWithConsumer>
      );
    }

    return children;
  }
}

export default UnityControl;
