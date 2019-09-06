
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
    onUpdate: func,
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
      const rectObject = {
        bottom: rect.bottom,
        height: rect.height,
        left: rect.left,
        right: rect.right,
        top: rect.top,
        width: rect.width,
        x: rect.x,
        y: rect.y,
      };

      if ( this.props.onChange ) {
        if (
          !( rectObject.bottom === 0 &&
            rectObject.height === 0 &&
            rectObject.left === 0 &&
            rectObject.right === 0 &&
            rectObject.top === 0 &&
            rectObject.width === 0 &&
            rectObject.x === 0 &&
            rectObject.y === 0 )
        ) {
          this.props.onChange( rectObject );
        }
      }
      this.rect = rectObject;
    });

    this.observer = observer;
    if ( this.observer !== null ) {
      this.observer.observe();
    }
  }

  handleSetSize = ( rect ) => {
    if ( !shallowCompare( this.state.size, rect )) {
      this.setState({
        size: rect,
      });
    }
  }

  render() {
    const { children, onUpdate } = this.props;

    return (
      typeof children === 'function'
        ? children({
          // setSize: this.handleSetSize,
          setObserve: this.setObserve,
          size: this.rect,
          updateArea: onUpdate ? () =>  onUpdate( this.rect ) : null,
        })
        : children
    );
  }
}

export default Area;
