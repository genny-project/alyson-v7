/* eslint-disable */

import React, { Component } from 'react';
import { object, node, string } from 'prop-types';
import { connect } from 'react-redux';
import { store } from '../../../../redux';
import { Box, Fragment, Icon, Touchable } from '../../index';
import { isObject } from '../../../../utils';

class Panel extends Component {
  static defaultProps = {
    location: 'centre',
    style: {},
  }

  static propTypes = {
    children: node,
    location: string,
    style: object,
    inheritedProps: object,
    aliases: object,
  }

  static getDerivedStateFromProps( nextProps, nextState ) {
    const panelId = `${nextProps.rootCode}:${nextProps.location}`

    if (
      isObject( nextProps.controls, { withProperty: panelId }) &&
      nextProps.controls[panelId] !== nextState.display
    ) {
      return { display: nextProps.controls[panelId] };
    }

    return null;
  }

  state = {
    // maximised: false,
    display: null
  }

  reset = () => {
    this.setState({
      display: 'open',
    })
  }

  close = () => {
    this.setState({
      display: 'closed',
    })
  }

  expand = () => {
    this.setState({
      display: 'maximised',
    })
  }

  handleToggleMaximised = () => {
    // this.setState( state => ({
    //   maximised: !state.maximised,
    // }))

    store.dispatch(
      {
        type: "ALIAS_TOGGLE",
        payload: {
          alias: "FULLSCREEN_PANEL",
          value: `${this.props.rootCode}-${this.props.location}`
        }
      }
    );

    /* send event to backend with:
      * userCode
      * be Code
      * panel Code
      * eventCode
    */

    /*
      backend needs to send back
      1/ Theme for Fullscreen
      2/ Link to Be, with linkValue Panel
      3/ Update the Fullscreen Alias
    */
  }

  handleOnLayout = ( event ) => {
    // console.log( `PANEL ${this.props.location}`, event.nativeEvent.layout.height );

    if ( this.props.onLayout ) this.props.onLayout( event, this.props.location );
  }

  render() {
    const { rootCode, children, location, style, inheritedProps, aliases, isExpandable } = this.props;
    const currentFullscreenCode = aliases['FULLSCREEN_PANEL'];

    const isFullscreen = `${rootCode}-${location}` === currentFullscreenCode && rootCode != null;

    const Wrapper = isExpandable ? 'div' : Fragment;

    // const specialStyle = this.state.display === 'closed' ? { width: '0%' } : this.state.display === 'open' ? { width: '100%' } : {};
    const specialStyle = {};

    const closedProps = this.state.display === 'closed' ? inheritedProps['closed'] : null;
    // console.log( this.props.rootCode, { inheritedProps })
    if ( this.props.rootCode === 'FRM_SIDEBAR' ) console.log( {inheritedProps, closedProps})

    return (
      <Box
        test-id={`rootCode-${location}-panel`}
        {...isExpandable ? { position: 'relative' } : {}}
        {...style}
        {...inheritedProps['default']}
        {...closedProps}
        // transitionDuration='200ms'
        // transitionProperty='width'
        // transitionTimingFunction='ease'
        {...specialStyle}
        onLayout={this.handleOnLayout}
      >
        {
          isExpandable
            ? (
              <Box
                position="absolute"
                top={0}
                right={0}
                zIndex={isObject(style , { withProperty: 'zIndex' }) ? style.zIndex + 1 : 'auto'}
              >
                <Touchable
                  onPress={this.handleToggleMaximised}
                  withFeedback
                  opacity={0}
                  hoverProps={{
                    style: {
                      opacity: 0.5
                    }
                  }}
                >
                  <Box
                    padding={5}
                  >
                    <Icon
                      size="sm"
                      color="black"
                      name={`fullscreen${isFullscreen ? '_exit' : ''}`}
                    />
                  </Box>
                  {/* <Box
                    transform="rotate(270deg)"
                  >
                    <Icon
                      size="sm"
                      color="black"
                      name="signal_cellular_4_bar"
                    />
                  </Box> */}
                </Touchable>
              </Box>
            ) : null
        }
        {/* {children} */}
        {React.Children.map( children, child => (
            React.cloneElement( child, {
              ...child.props,
              ...(this.state.display === 'closed') ? { isClosed: true } : {},
            })
          ))}
      </Box>
    );
  }
}

export { Panel };

const mapStateToProps = state => ({
  aliases: state.vertx.aliases,
  controls: state.vertx.controls,
});

export default connect( mapStateToProps )( Panel );