// /* eslint-disable */

import React, { Component } from 'react';
import { object, array, string, bool } from 'prop-types';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { Box, Text, Recurser, Swipeable } from '../index';
import Panel from './panel';
import {
  isArray,
  isObject,
  checkForNewLayoutLinks,
  checkForNewInheritedThemes,
  getLayoutLinksOfType,
  filterThemes,
  getDeviceSize,
} from '../../../utils';

const defaultStyle = {
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
  },
  rowMobile: {
    height: '100%',
  },
  panel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  north: {
    width: '100%',
    alignItems: 'flex-start',
  },
  south: {
    width: '100%',
    alignItems: 'flex-end',
  },
  east: {
    justifyContent: 'flex-end',
  },
  west: {
    justifyContent: 'flex-start',
  },
  centre: {
    flex: 1,
  },
};

class Frame extends Component {
  static defaultProps = {
    panels: [
      'NORTH', 'SOUTH', 'EAST', 'WEST', 'CENTRE',
    ],
    linkTypes: [
      'asks', 'frames', 'themes',
      'sublayouts', // legacy compatibility
    ],
    inheritedThemes: {},
  }

  static propTypes = {
    frames: object,
    themes: object,
    panels: array,
    linkTypes: array,
    rootCode: string,
    inheritedThemes: object,
    isRootFrame: bool,
    sublayouts: object, // legacy compatibility
  }

  state = {
    frames: [],
    asks: [],
    themes: [],
    sublayouts: [], // legacy compatibility
  }

  /* eslint-disable react/sort-comp */

  componentDidMount() {
    this.getChildLayouts();
  }

  shouldComponentUpdate( nextProps ) {
    /* If rootCode is different, then a different base
    entity needs to be rendered inside the frame */

    if ( this.props.rootCode !== nextProps.rootCode )
      return true;

    /* Check if any of the links of the root base entity have changed */
    if (  isObject( dlv( nextProps, `frames.${nextProps.rootCode}` ))) {
      if ( checkForNewLayoutLinks(
        /* Valid links are added to the state key that matches their
        link type, so check all the state arrays together */

        this.state.frames.concat(
          this.state.asks,
          this.state.themes,
          this.state.sublayouts, // legacy compatiblity
        ),
        dlv( nextProps, `frames.${nextProps.rootCode}.links` ),
        nextProps,
      )) {
        return true;
      }
    }

    /* Check if the inherited themes have changed */
    if ( checkForNewInheritedThemes( this.props.inheritedThemes, nextProps.inheritedThemes ))
      return true;

    return false;
  }

  componentDidUpdate() {
    this.getChildLayouts();
  }

  getChildLayouts = () => {
    const { rootCode, frames } = this.props;
    const rootFrame = frames[rootCode];

    if ( !rootFrame ) {
      return null;
    }

    /* filter each of the links based on their type */
    const linkedFrames = getLayoutLinksOfType( rootFrame.links, this.props, 'frame' );
    const linkedAsks = getLayoutLinksOfType( rootFrame.links, this.props, 'ask' );
    const linkedThemes = getLayoutLinksOfType( rootFrame.links, this.props, 'theme' );
    const linkedSublayouts = getLayoutLinksOfType( rootFrame.links, this.props, 'sublayout' ); // legacy compatiblity

    /* update the state  */
    this.updateLinks( 'frames', linkedFrames );
    this.updateLinks( 'asks', linkedAsks );
    this.updateLinks( 'themes', linkedThemes );
    this.updateLinks( 'sublayouts', linkedSublayouts ); // legacy compatiblity
  }

  updateLinks = ( stateKey, links ) => {
    /* check if the stateKey is valid  */
    if ( this.props.linkTypes.includes( stateKey )) {
      this.setState({
        [stateKey]: [
          ...links,
        ],
      }, () => {});
    }
  }

  getStyling = ( panel, onlyInheritableThemes ) => {
    return {
      ...this.props.inheritedThemes,
      ...filterThemes(
        this.state.themes,
        this.props.themes,
        {
          panel: panel,
          onlyInheritableThemes: onlyInheritableThemes,
        }
      ),
    };
  }

  render() {
    const { rootCode, frames, isRootFrame } = this.props;

    const rootFrame = frames[rootCode];

    if ( !rootFrame ) {
      return (
        <Box
          justifyContent="center"
          alignItems="center"
          flex={1}
        >
          <Text
            text="No Base Entity Found"
          />
        </Box>
      );
    }

    const filterByPanel = ( array, panel ) => {
      return array.filter( item => item.panel === panel );
    };

    const panelContent = this.state.frames.concat(
      this.state.asks,
      this.state.sublayouts, // legacy compatibility
    );

    const hasContent = ( panel ) => {
      return isArray( filterByPanel( panelContent, panel ), { ofMinLength: 1 });
    };

    /* Compile  all styling for the panel*/
    const getStylingByPanel = ( panel ) => {
      const checkPanelFlex = ( panel ) => {
        switch ( panel ) {
          case 'north':
          case 'south':
            return (
              hasContent( 'CENTRE' ) ||
              hasContent( 'EAST' ) ||
              hasContent( 'WEST' )
            ) ? {} : { flex: 1 };
          case 'east':
          case 'west':
            return hasContent( 'CENTRE' ) ? {} : { flex: 1 };
          case 'centre':
          default:
            return {};
        }
      };

      return {
        ...defaultStyle.panel,
        ...defaultStyle[panel],
        /* If the centre panel is rendered, then it is the only panel that expands.
          If not, then the other panels need to have flex 1 to expand. */
        ...checkPanelFlex( panel ),
        ...this.getStyling( panel.toUpperCase()),
      };
    };

    const isExpandable = ( panel ) => isArray( rootFrame.expandablePanels )
      ? rootFrame.expandablePanels.includes( panel )
      : false;

    const shouldUseSwipeable = (
      getDeviceSize() === 'sm' &&
      !isRootFrame &&
      hasContent( 'CENTRE' ) && (
        hasContent( 'WEST' ) ||
        hasContent( 'EAST' )
      )
    );

    const RowComponent = shouldUseSwipeable
      ? Swipeable
      : Box;

    return (
      <Box
        id="wrapper"
        text
        {...defaultStyle.wrapper}
        backgroundColor="green"
      >
        {
          hasContent( 'NORTH' )
            ? (
              <Panel
                rootCode={rootCode}
                location="NORTH"
                style={getStylingByPanel( 'north' )}
                isExpandable={isExpandable( 'NORTH' )}
              >
                <Recurser
                  content={filterByPanel( panelContent, 'NORTH' )}
                  themes={{ ...this.getStyling( 'NORTH', true ) }}
                />
              </Panel>
            )
            : null
          }
        {
            hasContent( 'WEST' ) ||
            hasContent( 'CENTRE' ) ||
            hasContent( 'EAST' )
              ? (
                <RowComponent
                  id="row"
                  {...shouldUseSwipeable ? defaultStyle.rowMobile : defaultStyle.row}
                >
                  {
                    hasContent( 'WEST' )
                      ? (
                        <Panel
                          rootCode={rootCode}
                          location="WEST"
                          style={getStylingByPanel( 'west' )}
                          isExpandable={isExpandable( 'WEST' )}
                        >
                          <Recurser
                            content={filterByPanel( panelContent, 'WEST' )}
                            themes={{ ...this.getStyling( 'WEST', true ) }}
                          />
                        </Panel>
                      )
                      : null
                  }
                  {
                    hasContent( 'CENTRE' )
                      ? (
                        <Panel
                          rootCode={rootCode}
                          location="CENTRE"
                          style={getStylingByPanel( 'centre' )}
                          isExpandable={isExpandable( 'CENTRE' )}
                        >
                          <Recurser
                            content={filterByPanel( panelContent, 'CENTRE' )}
                            themes={{ ...this.getStyling( 'CENTRE', true ) }}
                          />
                        </Panel>
                      )
                      : null
                  }
                  {
                    hasContent( 'EAST' )
                      ? (
                        <Panel
                          rootCode={rootCode}
                          location="EAST"
                          style={getStylingByPanel( 'east' )}
                          isExpandable={isExpandable( 'EAST' )}
                        >
                          <Recurser
                            content={filterByPanel( panelContent, 'EAST' )}
                            themes={{ ...this.getStyling( 'EAST', true ) }}
                          />
                        </Panel>
                      )
                      : null
                  }
                </RowComponent>
              )
              : null
          }
        {
            hasContent( 'SOUTH' )
              ? (
                <Panel
                  rootCode={rootCode}
                  location="SOUTH"
                  style={getStylingByPanel( 'south' )}
                  isExpandable={isExpandable( 'SOUTH' )}
                >
                  <Recurser
                    content={filterByPanel( panelContent, 'SOUTH' )}
                    themes={{ ...this.getStyling( 'SOUTH', true ) }}
                  />
                </Panel>
              )
              : null
          }
      </Box>
    );
  }
}

export { Frame };

const mapStateToProps = state => ({
  baseEntities: state.vertx.baseEntities.data,
  asks: state.vertx.asks,
  themes: state.vertx.layouts.themes,
  frames: state.vertx.layouts.frames,
  layoutsLegacy: state.vertx.layoutsLegacy,
});

export default connect( mapStateToProps )( Frame );
