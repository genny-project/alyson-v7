// /* eslint-disable */

import React, { Component } from 'react';
import { object, array, string, bool } from 'prop-types';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { findNodeHandle } from 'react-native';
import {
  Box,
  Text,
  Recurser,
  Swipeable,
  ActivityIndicator,
  Touchable,
  Icon,
  Dropdown,
  Fragment,
} from '../../components';
import Panel from './panel';
import {
  isArray,
  isObject,
  checkForNewLayoutLinks,
  checkForNewInheritedThemes,
  getLayoutLinksOfType,
  filterThemes,
  getPropsFromThemes,
  getDeviceSize,
  shallowCompare,
  objectMerge,
  storeQuery,
  setTitle,
  saveElementAsPdf,
} from '../../../utils';

import Sam from './sam';

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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  north: {
    width: '100%',
    flexDirection: 'column',
  },
  south: {
    width: '100%',
    flexDirection: 'column-reverse',
  },
  east: {
    flexDirection: 'row-reverse',
  },
  west: {
    flexDirection: 'row',
  },
  centre: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

class Frame extends Component {
  static defaultProps = {
    panels: ['NORTH', 'SOUTH', 'EAST', 'WEST', 'CENTRE', 'FRAME'],
    linkTypes: ['asks', 'frames', 'themes'],
    inheritedProps: {},
    wrapperThemes: {},
  };

  static propTypes = {
    frames: object,
    themes: object,
    panels: array,
    linkTypes: array,
    rootCode: string,
    inheritedProps: object,
    isRootFrame: bool,
    isClosed: bool,
    wrapperThemes: object,
  };

  frame = null;

  state = {
    frames: [],
    asks: [],
    themes: [],
    panels: {},
  };

  /* eslint-disable react/sort-comp */

  componentDidMount() {
    this.getChildLayouts();
  }

  shouldComponentUpdate( nextProps, nextState ) {
    // console.log( 'should update', nextProps.rootCode );

    /* If rootCode is different, then a different base
    entity needs to be rendered inside the frame */
    if ( this.props.rootCode !== nextProps.rootCode ) return true;

    /* Check if any of the links of the root base entity have changed */
    if ( isObject( dlv( nextProps, `frames.${nextProps.rootCode}` ))) {
      if (
        checkForNewLayoutLinks(
          /* Valid links are added to the state key that matches their
        link type, so check all the state arrays together */

          this.state.frames.concat( this.state.asks, this.state.themes ),
          dlv( nextProps, `frames.${nextProps.rootCode}.links` ),
          nextProps,
          {},
          this.props.rootCode === 'FRM_MAIN'
        )
      ) {
        return true;
      }
    }

    /* Check if the inherited themes have changed */
    if ( checkForNewInheritedThemes( this.props.inheritedProps, nextProps.inheritedProps )) {
      return true;
    }

    if ( this.props.isClosed !== nextProps.isClosed ) {
      return true;
    }

    if ( !shallowCompare( this.state.panels, nextState.panels )) {
      return true;
    }

    // console.log( 'check theme properties' );

    if ( this.checkThemeProperties( nextState.themes, this.props.themes, nextProps.themes )) {
      // console.log( 'new properties found' );

      return true;
    }

    // console.log( '7' );
    // console.log( '-----------------------------' );
    // console.log( 'no updates' );

    return false;
  }

  componentDidUpdate() {
    this.getChildLayouts();
  }

  checkThemeProperties = ( linkedThemes, currentThemes, nextThemes ) => {
    if ( !isArray( linkedThemes )) {
      return false;
    }

    const hasUpdatedTheme = linkedThemes.some( theme => {
      // console.log( 'theme', theme, currentThemes, nextThemes );

      const currentThemeData = dlv( currentThemes, `${theme.code}` );
      const nextThemeData = dlv( nextThemes, `${theme.code}` );

      // console.log( 'themeData', currentThemeData, nextThemeData );

      if ( !isObject( currentThemeData ) || !isObject( nextThemeData )) {
        return true;
      }

      if ( isObject( nextThemeData, { withProperty: 'data' })) {
        const currentThemePropKeys = Object.keys( currentThemeData.data );
        const newThemePropKeys = Object.keys( nextThemeData.data );

        if ( currentThemePropKeys.length !== newThemePropKeys.length ) {
          return true;
        }

        const hasUpdatedProperties = newThemePropKeys.some( propKey => {
          const currentPropObject = currentThemeData.data[propKey];
          const nextPropObject = nextThemeData.data[propKey];

          // console.log( 'compare', currentPropObject, nextPropObject ) );

          if ( !shallowCompare( currentPropObject, nextPropObject )) {
            return true;
          }

          return false;
        });

        return hasUpdatedProperties;
      }

      return false;
    });

    return hasUpdatedTheme;
  };

  getChildLayouts = () => {
    const { rootCode, frames } = this.props;
    const rootFrame = frames[rootCode];

    if ( !rootFrame ) {
      return null;
    }

    /* filter each of the links based on their type */
    const linkedFrames = getLayoutLinksOfType( rootFrame.links, this.props, 'frame' );
    const linkedAsks = getLayoutLinksOfType(
      rootFrame.links,
      this.props,
      'ask',
      this.props.rootCode === 'FRM_SIDEBAR'
    );
    const linkedThemes = getLayoutLinksOfType( rootFrame.links, this.props, 'theme' );

    /* update the state  */
    this.updateLinks( 'frames', linkedFrames );
    this.updateLinks( 'asks', linkedAsks );
    this.updateLinks( 'themes', linkedThemes );
  };

  updateLinks = ( stateKey, links ) => {
    /* check if the stateKey is valid  */
    if ( this.props.linkTypes.includes( stateKey )) {
      this.setState(
        {
          [stateKey]: [...links],
        },
        () => {}
      );
    }
  };

  getInhertiableThemes = panel => {
    const panelLinks = [
      ...filterThemes( this.state.themes, this.props.themes, {
        panel: panel,
        onlyInheritableThemes: true,
      }),
    ];

    // get props from theme links
    const themeProps = getPropsFromThemes( panelLinks, this.props.themes );

    // console.warn({ getInhertiableThemes: themeProps });

    return {
      ...objectMerge( this.props.inheritedProps, themeProps ),
    };
  };

  getPropertiesByPanel = panel => {
    let properties = {};

    const checkThemeForProperties = ( themes, panel ) => {
      if ( !isArray( themes )) return;

      themes.filter( theme => theme.panel === panel ).forEach( linkedTheme => {
        const themeProperties = dlv( this.props.themes, `${linkedTheme.code}.properties` );

        if ( isObject( themeProperties )) {
          properties = {
            ...properties,
            ...themeProperties,
          };
        }
      });
    };

    checkThemeForProperties( this.props.inheritedProps, panel );
    checkThemeForProperties( this.state.themes, panel );

    return properties;
  };

  handleRef = ref => {
    this.frame = ref;
  };

  handlePress = () => {
    if ( this.frame ) {
      const element = findNodeHandle( this.frame );

      if ( element ) saveElementAsPdf( element, { code: this.props.rootCode });
    }
  };

  render() {
    const { rootCode, frames, isRootFrame, isClosed, wrapperThemes } = this.props;

    const rootFrame = frames[rootCode];

    const projectAttributes = storeQuery.getProjectAttributes();
    const projectName = dlv( projectAttributes, 'PRI_NAME.value' );

    if ( !rootFrame ) {
      console.warn('waiting for Root Frame...'); // eslint-disable-line

      setTitle( projectName );

      return (
        <Box
          justifyContent="center"
          alignItems="center"
          flex={1}
          flexDirection="column"
        >
          <ActivityIndicator size="large" />
          <Box height={20} />
          <Text
            text="Loading..."
            align="center"
          />
        </Box>
      );
    }

    return <Sam {...this.props} />;
  }
}

export { Frame };

const mapStateToProps = state => ({
  baseEntities: state.vertx.baseEntities.data,
  asks: state.vertx.asks,
  themes: state.vertx.layouts.themes,
  frames: state.vertx.layouts.frames,
  vertx: state.vertx.layouts,
});

export default connect( mapStateToProps )( Frame );
