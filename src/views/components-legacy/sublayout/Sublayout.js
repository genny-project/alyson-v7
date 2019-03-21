import React, { Component } from 'react';
import { string, object, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { LayoutLoaderLegacy } from '../';
import { isString, location, removeStartingAndEndingSlashes, isObject } from '../../../utils';

class Sublayout extends Component {
  static propTypes = {
    layoutName: string,
    sublayouts: object,
    pages: object,
    dispatch: func,
    layoutsLegacy: object,
    getLayoutTypeFromName: bool,
    identifier: string,
  };

  state = {
    layout: null,
    params: {},
  }

  componentDidMount() {
    this.getLayout();
  }

  componentDidUpdate( prevProps, prevState ) {
    if (
      isString( this.props.layoutName ) &&
      isString( prevProps.layoutName ) &&
      this.props.layoutName !== prevProps.layoutName
    ) {
      this.getLayout();
    }

    if ( prevState.url !== location.getBasePath()) {
      this.getParams();
    }
  }

  getLayout() {
    const { layoutsLegacy, layoutName, getLayoutTypeFromName } = this.props;
    const layoutPath = getLayoutTypeFromName
      ? `${layoutName.split( '/' )[0]}.${layoutName.split( '/' ).slice( 1, layoutName.split( '/' ).length ).join( '/' )}`
      : `sublayouts.${layoutName}`;
    let layout = dlv( layoutsLegacy, `${layoutPath}` );

    if ( !layout ) {
      const pageWithId = this.parseLocation( `${layoutName.split( '/' ).slice( 1, layoutName.split( '/' ).length ).join( '/' )}` );
      
      layout = dlv( layoutsLegacy, `pages.${pageWithId}` );
    }

    if ( layout ) {
      this.setState({ layout });
    }
    else {
      // eslint-disable-next-line no-console
      console.warn( 'layout not found', { layoutName });
    }
  }

  getParams() {
    const layoutPool = dlv( this.props.layoutsLegacy, 'pages' );

    if ( !isObject( layoutPool )) return;

    const currentUrl = location.getBasePath();
    const strippedCurrentUrl = removeStartingAndEndingSlashes( currentUrl );

    const keys = Object.keys( layoutPool ).sort( this.handleSortPages );
    const fragments = strippedCurrentUrl.split( '/' );

    keys.some( key => {
      const params = {};

      const splitKey = key.split( '/' ).map(( split, index ) => {
        if ( split.startsWith( ':' )) {
          params[split.slice( 1 )] = fragments[index];

          return fragments[index];
        }

        return split;
      });

      if ( splitKey.join( '/' ) === strippedCurrentUrl ) {
        this.setState({
          url: location.getBasePath(),
          params: {
            ...location.state,
            ...params,
          },
        });

        return true;
      }
    });
  }

  parseLocation = ( path ) => {
    const split = path.split( '/' );
    const items = [];
    const paths = [];
    let pathMatch = null;

    split.forEach( section => {
      if ( isString( section, { ofMinLength: 1 })) {
        items.push( section );
      }
    });

    items.forEach(( item, index ) => {
      const path = items.slice( 0, index + 1 );

      paths.push( path.join( '/' ));
    });

    paths.forEach( path => {
      const page = this.checkPagesForMatch( path );

      if (
        isString( page )
      ) {
        pathMatch = page;
      }
    });

    return pathMatch;
  }

  checkPagesForMatch = ( path ) => {
    const { layoutsLegacy } = this.props;
    const { pages } = layoutsLegacy;
    let page = null;

    page = pages[path];

    if ( page ) return page;

    // get path for each page with a variable
    const pagesWithVariables = Object.keys( pages ).filter( page => page.includes( ':' ));

    // find the index of the variable after splitting
    pagesWithVariables.forEach( pageWithVariablePath => {
      const pageWithVariablePathSplit = pageWithVariablePath.split( '/' );
      const variableIndex = pageWithVariablePathSplit.findIndex( x => x.includes( ':' ));

      if ( variableIndex > 0 ) {
        // get the corresponding code from the same split index from the current path
        const pathSplit = path.split( '/' );

        if ( pathSplit.length === pageWithVariablePathSplit.length ) {
          const pathWithVariableRemoved = pathSplit
            .filter(( string, index ) => index !== variableIndex );
          const pageWithVariablePathWithVariableRemoved = pageWithVariablePathSplit
            .filter(( string, index ) => index !== variableIndex );

          // check all other splits and see if they match
          const isMatch = pathWithVariableRemoved
            .every(( stringA, index ) =>
              stringA === pageWithVariablePathWithVariableRemoved[index] );

          if ( isMatch ) {
            page = pageWithVariablePath;
          }
        }
      }
    });

    if ( page ) return page;
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { layoutsLegacy, dispatch, layoutName, ...restProps } = this.props;
    const { layout, params } = this.state;

    return (
      <LayoutLoaderLegacy
        layout={layout}
        sublayoutProps={restProps}
        sublayout
        params={params}
        identifier={this.props.getLayoutTypeFromName ? this.props.identifier : null}
      />
    );
  }
}

const mapStateToProps = state => ({
  layoutsLegacy: state.vertx.layoutsLegacy,
});

export default connect( mapStateToProps )( Sublayout );
