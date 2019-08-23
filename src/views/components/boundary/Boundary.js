
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

  currentArea = null;

  state = {
    boundaryAdjustedArea: {
      x: null,
      y: null,
    },
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

    if ( this.currentArea != null ) return null;

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
    if ( area.bottom > screenBottom ) bottomOffset = area.bottom - screenBottom;

    const boundaryAdjustedX = isInteger( leftOffset ) || isInteger( rightOffset )
      ? area.left + leftOffset - rightOffset : null;
    const boundaryAdjustedY = isInteger( topOffset ) || isInteger( bottomOffset )
      ? area.top + topOffset - bottomOffset : null;

    const resultant = {
      x: null,
      y: null,
    };

    if ( isInteger( boundaryAdjustedX )) resultant['x'] = boundaryAdjustedX;
    if ( isInteger( boundaryAdjustedY )) resultant['y'] = boundaryAdjustedY;

    this.currentArea = area;

    if (
      resultant.x !== this.state.boundaryAdjustedArea.x ||
      resultant.y !== this.state.boundaryAdjustedArea.y
    ) {
      if (
        isInteger( boundaryAdjustedX ) ||
          isInteger( boundaryAdjustedY )
      ) {
        this.setState({
          boundaryAdjustedArea: resultant,
        });
      }
      else {
        this.setState({
          boundaryAdjustedArea: {
            x: null,
            y: null,
          },
        });
      }
    }
  }

  render() {
    const { children } = this.props;

    return (
      typeof children === 'function'
        ? children({
          updateBoundaryArea: this.updateBoundaryArea,
          boundaryAdjustedArea: this.state.boundaryAdjustedArea,
        })
        : children
    );
  }
}

export default Boundary;
