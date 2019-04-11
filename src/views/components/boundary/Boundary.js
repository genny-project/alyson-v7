
import { Component } from 'react';
import { node, oneOfType, func } from 'prop-types';
import { Dimensions } from 'react-native-web';
import { isObject, isInteger } from '../../../utils';

class Boundary extends Component {
  static propTypes = {
    children: oneOfType( [
      node, func,
    ] ),
  }

  state = {
    boundaryAdjustedArea: null,
  }

  updateBoundaryArea = ( area ) => {
    if (
      !isObject( area ) || (
        area.bottom === 0 &&
        area.height === 0 &&
        area.left === 0 &&
        area.right === 0 &&
        area.top === 0 &&
        area.width === 0 &&
        area.x === 0 &&
        area.y === 0
      )
    ) return null;

    const dimensions = Dimensions.get( 'window' );

    const screenLeft = 0;
    const screenRight = dimensions.width;

    const screenTop = 0;
    const screenBottom = dimensions.height;

    let leftOffset = null;
    let rightOffset = null;
    let topOffset = null;
    let bottomOffset = null;

    if ( area.left < screenLeft ) leftOffset = screenLeft - area.left;
    if ( area.right > screenRight ) rightOffset = area.right - screenRight;

    if ( area.top < screenTop ) topOffset = screenTop - area.top;
    if ( area.bottom > screenBottom ) bottomOffset = area.bottom - screenRight;

    const boundaryAdjustedLeft = isInteger( leftOffset ) || isInteger( rightOffset )
      ? area.left + leftOffset - rightOffset : null;
    const boundaryAdjustedTop = isInteger( topOffset ) || isInteger( bottomOffset )
      ? area.top + topOffset - bottomOffset : null;

    const resultant = {};

    if ( isInteger( boundaryAdjustedLeft )) resultant['left'] = boundaryAdjustedLeft;
    if ( isInteger( boundaryAdjustedTop )) resultant['top'] = boundaryAdjustedTop;

    if (
      (
        isInteger( boundaryAdjustedLeft ) ||
        isInteger( boundaryAdjustedTop )
      ) && (
        !this.state.boundaryAdjustedArea ||
        boundaryAdjustedLeft !== this.state.boundaryAdjustedArea.left ||
        boundaryAdjustedTop !== this.state.boundaryAdjustedArea.top
      )
    ) {
      this.setState({
        boundaryAdjustedArea: resultant,
      });
    }
  }

  render() {
    const { children } = this.props;

    return (
      typeof children === 'function'
        ? children({
          // setSize: this.handleSetSize,
          // setObserve: this.setObserve,
          // size: this.state.size,
          updateBoundaryArea: this.updateBoundaryArea,
          boundaryAdjustedArea: this.state.boundaryAdjustedArea,
        })
        : children
    );
  }
}

export default Boundary;
