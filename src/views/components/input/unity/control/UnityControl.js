import React, { Component } from 'react';
import { object } from 'prop-types';
import dlv from 'dlv';
import { isArray, isString } from '../../../../../utils';
import UnityControlWithConsumer from './control-with-consumer';

class UnityControl extends Component {
  static propTypes = {
    ask: object,
  }

  state = {
    currentSceneCode: null,
  }

  componentDidMount() {
    this.checkLinksForSceneCode();
  }

  componentDidUpdate() {
    // console.warn( '-----------------' );

    this.checkLinksForSceneCode();
  }

  checkLinksForSceneCode = () => {
    const { currentSceneCode } = this.state;

    const askLinks = dlv( this.props, `asks.${this.props.ask.questionCode}.links` );

    // console.warn( this.props.ask.questionCode, { askLinks, asks: this.props.asks, props: this.props });

    // 1. checking if there is a unity config link

    if ( isArray( askLinks, { ofMinLength: 1 })) {
      askLinks.filter( link => link.type === 'unity' );

      if ( isArray( askLinks, { ofMinLength: 1 })) {
        const { sceneCode } = askLinks[0];

        // console.warn( this.props.ask.questionCode, { sceneCode, currentSceneCode });

        // 2. checking if the sceneCode is different from the one saved in the state
        if (
          isString( sceneCode ) && (
            !isString( currentSceneCode ) ||
            currentSceneCode !== sceneCode
          )
        ) {
          this.updateSceneCode( sceneCode );

          return;
        }

        return;
      }
    }

    if ( currentSceneCode != null ) {
      this.updateSceneCode( null );
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

    // console.warn( '--------------' );

    if ( isString( currentSceneCode )) {
      // console.warn( this.props.ask.questionCode, 'render with consumer', currentSceneCode );

      return (
        <UnityControlWithConsumer
          currentSceneCode={currentSceneCode}
          questionCode={this.props.ask.questionCode}
        >
          {children}
        </UnityControlWithConsumer>
      );
    }

    // console.warn( this.props.ask.questionCode, 'render children', currentSceneCode );

    return children;
  }
}

export default UnityControl;
