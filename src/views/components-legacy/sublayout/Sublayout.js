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
    const layout = dlv( layoutsLegacy, `${layoutPath}` );

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
