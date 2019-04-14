import { Component } from 'react';
import dlv from 'dlv';
import { func, string } from 'prop-types';
import { Bridge } from '../../../utils';

class Pagination extends Component {
  static defaultProps = {
  }

  static propTypes = {
    children: func.isRequired,
    code: string,
  }

  state = {
    currentPage: 0,
  }

  handleScrollForMore = ( event ) => {
    // TODO - get total items

    const { target, nativeEvent } = event;

    if ( !target && !nativeEvent ) return null;

    const contentHeight = dlv( target, 'scrollHeight' ) || dlv( nativeEvent, 'contentSize.height' );
    const offset = dlv( target, 'scrollTop' ) || dlv( nativeEvent, 'contentOffset.y' );
    const containerHeight = dlv( target, 'clientHeight' ) || dlv( nativeEvent, 'layoutMeasurement.height' );

    if ( !contentHeight || !offset || !containerHeight ) return null;

    const isBottom = contentHeight - offset <= containerHeight;

    if ( isBottom ) {
      const value = {
        pageSize: 10,
        pageIndex: this.state.currentPage,
      };

      const valueString = (
        value &&
        typeof value === 'string'
      )
        ? value
        : JSON.stringify( value );

      Bridge.sendEvent({
        event: 'PAGINATION',
        sendWithToken: true,
        data: {
          code: this.props.code || null,
          value: valueString || null,
        },
      });

      this.setState( state => ({
        currentPage: state.currentPage + 1,
      }));
    }
  }

  render() {
    const { children } = this.props;

    // TODO add getNextPage event
    // https://github.com/bvaughn/react-window pagination

    return children( this.state, this.handleScrollForMore );
  }
}

export default Pagination;
