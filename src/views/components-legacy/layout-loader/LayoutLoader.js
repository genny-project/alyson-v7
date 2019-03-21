/* eslint-disable eqeqeq */
import React, { PureComponent } from 'react';
import { shape, object, any, bool , func } from 'prop-types';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native-web';

import { openSidebar } from '../../../redux/actions';
import { isArray, getDeviceSize } from '../../../utils';
import { curlyBracketParse } from '../../../utils-legacy';
import DataQuery from '../../../utils-legacy/data-query';
import { BoxLegacy as Box, ActivityIndicatorLegacy as ActivityIndicator, FragmentLegacy as Fragment } from '../../components-legacy';
import RecursiveLegacy from './RecursiveLegacy';

const currentHourOfDay = new Date().getHours();

const timeUtils = {
  timeOfDay: (
    currentHourOfDay < 6 ? 'evening'
    : currentHourOfDay < 12 ? 'morning'
    : currentHourOfDay < 18 ? 'afternoon'
    : 'evening'
  ),
};

const windowDimensions = Dimensions.get( 'window' );
const screenDimensions = Dimensions.get( 'screen' );

class LayoutLoader extends PureComponent {
  static propTypes = {
    layout: shape({
      layout: object,
      children: any,
      context: any,
    }),
    data: object,
    navigation: object,
    sublayoutProps: object,
    sublayout: bool,
    router: object,
    isDialog: bool,
    sidebar: object,
    openSidebar: func,
    context: object,
    params: object,
  };

  static getDerivedStateFromProps( props, state ) {
    const result = {};

    if (
      props.params && (
        !state.navigation ||
        props.params != state.navigation
      )
    ) {
      result.navigation = props.params;
    }

    if ( props.sublayoutProps != state.props )
      result.props = props.sublayoutProps;

    return Object.keys( result ).length > 0 ? result : null;
  }

  /* eslint-enable react/sort-comp */

  state = {
    query: {},
    navigation: null,
    time: timeUtils,
    user: this.props.data.user,
    sidebar: this.props.sidebar,
    actions: {},
    props: this.props.sublayoutProps,
    media: {
      window: windowDimensions,
      screen: screenDimensions,
      size: getDeviceSize(),
    },
  }

  componentDidUpdate( prevProps ) {
    if (
      this.props.layout && (
        this.props.data != prevProps.data ||
        this.props.layout != prevProps.layout ||
        this.props.params != prevProps.params
      )
    ) {
      this.doDataQuery();
    }
  }

  componentWillUnmount() {
    Dimensions.removeEventListener( 'change' );
  }

  shouldPullFromCache() {
    const { layout, data } = this.props;

    if ( layout.cache ) {
      const { id, key } = layout.cache;

      /* Check that the browser has local storage support */
      if ( typeof localStorage === 'undefined' ) {
        return false;
      }

      /* Check the cache exists */
      if ( !localStorage.getItem( `cache-${id}` )) {
        return false;
      }

      const existingCache = JSON.parse( localStorage.getItem( `cache-${id}` ));

      /* Check whether the cache has expired */
      if ( existingCache.expiry < new Date().getTime()) {
        return false;
      }

      /* Calculate the key and see if it matches the previous key */
      const newKey = curlyBracketParse( key, data );

      /* Check whether the keys match */
      if ( newKey !== existingCache.key ) {
        return false;
      }

      return true;
    }

    return false;
  }

  shouldStoreCache( result ) {
    const { onlyStoreIf } = this.props.layout.cache;

    if ( !onlyStoreIf ) {
      return true;
    }

    const existing = onlyStoreIf.filter( key => result[key] == null );

    return existing.length === 0;
  }

  doDataQuery() {
    const { data, layout } = this.props;

    /* Check whether we should pull the data from the cache */
    const shouldPullFromCache = this.shouldPullFromCache();

    if ( shouldPullFromCache ) {
      const cachedData = JSON.parse( localStorage.getItem( `cache-${layout.cache.id}` )).data;

      this.setState({ query: cachedData });
    } else {
      // eslint-disable-next-line react/no-access-state-in-setstate
      const query = new DataQuery( data ).query( layout.query, this.state );

      /* Store the data in the cache */
      if ( layout.cache ) {
        if ( this.shouldStoreCache( query )) {
          localStorage.setItem( `cache-${layout.cache.id}`, JSON.stringify({
            key: curlyBracketParse( layout.cache.key, data ),
            expiry: new Date().getTime() + layout.cache.expiry * 1000,
            data: query,
          }));
        }
      }

      this.setState({ query });
    }
  }

  handleRetry = () => {
    if ( this.timeout ) this.timeout.startTimeout();
  };

  render() {
    const {
      layout,
      sublayout,
      isDialog,
    } = this.props;

    if ( !layout ) {
      return (
        <Box
          width="100%"
          flex={1}
          justifyContent="center"
          alignItems="center"
        >
          <ActivityIndicator size="large" />
        </Box>
      );
    }

    // const { routes, index } = store.getState().navigation;
    // const currentRoute = routes && routes[index];
    // const currentRouteParams = currentRoute && currentRoute.params;

    /**
     * TODO:
     *
     * Move the context object into state so it doesn't happen every render
     */

    /* Calculate the data for the layout */

    const Holder = (
      sublayout ||
      isDialog
    )
      ? Fragment
      : Box;

    return (
      <Holder
        {...layout.layout}
        context={this.state}
      >
        {isArray( layout.children ) ? (
          layout.children.map(( child, index ) => (
            <RecursiveLegacy
              key={index} // eslint-disable-line react/no-array-index-key
              {...child}
              context={this.state}
            />
          ))
        ) : layout.children}
      </Holder>
    );
  }
}

const mapStateToProps = state => ({
  data: state.vertx,
  router: state.router,
});

export default connect( mapStateToProps, { openSidebar })( LayoutLoader );
