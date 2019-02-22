import React, { Component } from 'react';
import { string, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { LayoutLoaderLegacy } from '../';
import { isString, location, removeStartingAndEndingSlashes } from '../../../utils';

class Sublayout extends Component {
  static propTypes = {
    layoutName: string,
    sublayouts: object,
    pages: object,
    dispatch: func,
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
    const { sublayouts, layoutName } = this.props;
    const layout = sublayouts[layoutName];

    if ( layout ) {
      this.setState({ layout });
    }
    else {
      // eslint-disable-next-line no-console
      console.warn( 'layout not found', { layoutName });
    }
  }

  getParams() {
    const layoutPool = this.props.pages;
    const currentUrl = location.getBasePath();

    const strippedCurrentUrl = removeStartingAndEndingSlashes( currentUrl );

    const keys = Object.keys( layoutPool ).sort( this.handleSortPages );
    const fragments = strippedCurrentUrl.split( '/' );

    const found = keys.some( key => {
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
    const { sublayouts, dispatch, layoutName, ...restProps } = this.props;
    const { layout, params, url } = this.state;

    console.log( 'params', params, url, layout );

    return (
      <LayoutLoaderLegacy
        layout={layout}
        sublayoutProps={restProps}
        sublayout
        params={params}
      />
    );
  }
}

const mapStateToProps = state => ({
  sublayouts: state.vertx.layoutsLegacy.sublayouts,
  pages: state.vertx.layoutsLegacy.pages,
});

export default connect( mapStateToProps )( Sublayout );
