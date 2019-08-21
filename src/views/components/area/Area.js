
import { Component } from 'react';
import { node, oneOfType, func } from 'prop-types';
import observeRect from '@reach/observe-rect';
import { shallowCompare } from '../../../utils';

class Area extends Component {
  static propTypes = {
    children: oneOfType( [
      node, func,
    ] ),
    onChange: func,
  }

  observer = null;
  rect = null;

  state = {
    size: null,
  }

  componentWillUnmount() {
    if ( this.observer !== null ) {
      this.observer.unobserve();
      this.observer = null;
    }
  }

  setObserve = ( node ) => {
    if ( node == null ) return;

    const observer = observeRect( node, rect => {
      if ( this.props.onChange ) this.props.onChange( rect );
    });

    this.observer = observer;
    if ( this.observer !== null ) {
      this.observer.observe();
    }
  }

  handleSetSize = ( dimensions ) => {
    if ( !shallowCompare( this.state.size, dimensions )) {
      this.setState({
        size: dimensions,
      });
    }
  }

  render() {
    const { children } = this.props;

    return (
      typeof children === 'function'
        ? children({
          // setSize: this.handleSetSize,
          setObserve: this.setObserve,
          size: this.state.size,
        })
        : children
    );
  }
}

export default Area;
