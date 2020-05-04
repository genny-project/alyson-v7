import React, { Component } from 'react';
import { node, string, number, oneOf, bool, oneOfType } from 'prop-types';
import { Dimensions } from 'react-native-web';
import { isObject, isInteger } from '../../../../utils';
import { Box, Portal, Boundary, Area } from '../../index';
import MenuConsumer from '../consumer';

class MenuContent extends Component {
  static defaultProps = {
    offsetX: 0,
    offsetY: 0,
    position: 'left',
    autofocus: false,
    maxHeight: 200,
  }

  // use GROUP_CONTENT_WRAPPER to change position

  static propTypes = {
    children: node.isRequired,
    testID: string,
    offsetX: number,
    offsetY: number,
    position: oneOf( [
      'left', 'center', 'right',
    ] ),
    autofocus: bool,
    open: bool,
    maxHeight: oneOfType( [
      string, number,
    ] ),
  }

  focus() {
    if (
      this.input &&
      this.props.autofocus
    ) {
      this.input.focus();
    }
  }

  handleLayout = () => {
    if (
      this.input &&
      this.props.autofocus
    ) {
      this.input.focus();
    }
  }

  handleRef = input => {
    this.input = input;
  }

  render() {
    const {
      children,
      testID,
      offsetX,
      offsetY,
      position,
      autofocus, // eslint-disable-line
      open, // eslint-disable-line
      maxHeight,
      ...restProps
    } = this.props;

    return (
      <MenuConsumer>
        {({
          isOpen,
          buttonArea,
          setRef,
          handleContentBlur,
          handleContentFocus,
        }) => {
          return (
            ( isOpen && buttonArea != null ) && (
              <Portal>
                <Boundary>
                  {({ boundaryAdjustedArea, updateBoundaryArea }) => {
                    return (
                      <Area
                        identifier={`content-${testID}`}
                        onChange={updateBoundaryArea}
                      >
                        {( areaProps ) => {
                          const x = isObject( boundaryAdjustedArea, { withProperty: 'x' }) ? boundaryAdjustedArea.x : null;
                          const y = isObject( boundaryAdjustedArea, { withProperty: 'y' }) ? boundaryAdjustedArea.y : null;

                          const positions = {
                            left: buttonArea.left + offsetX,
                            center: buttonArea.left + ( buttonArea.width / 2 ) + offsetX,
                            right: buttonArea.right + offsetX,
                          };

                          const top = buttonArea.bottom + offsetY;

                          const dimensions = Dimensions.get( 'window' );
                          const screenBottom = dimensions.height;

                          const height = isInteger( top ) ? screenBottom - top : null;

                          // check if item box will be pushed off the bottom of the screen
                          // if yes, then check the space between the top of the item box and the bottom of the screen
                          // if at least 150px, then set as the maxHeight of the input
                          // if less than 150px, then set the top of the input as the bottom of the item box

                          // isObject( areaProps.size, { withProperty: 'height' });

                          const newBottom = isInteger( height, { isLessThan: maxHeight })
                            ? buttonArea.top
                            : null;

                          const style = {
                            position: 'absolute',
                            top: newBottom
                              ? newBottom
                              : isInteger( y )
                                ? y
                                : top,
                            left: isInteger( x )
                              ? x
                              : positions[position],
                            ...( isInteger( x )
                              ? {}
                              : { transform: `translate( -${
                                position === 'right'
                                  ? 100
                                  : position === 'center'
                                    ? 50
                                    : 0
                              }%, -${
                                newBottom
                                  ? 100
                                  : 0
                              }% )` }),
                          };

                          return (
                            <div
                              ref={ref => {
                                this.input = ref;
                                areaProps.setObserve( ref );
                                setRef( ref, 'menu' );
                              }}
                              tabIndex="-1"
                              style={style}
                              onBlur={handleContentBlur}
                              onFocus={handleContentFocus}
                            >
                              <Box
                                flexDirection="column"
                                onLayout={this.handleLayout}
                                identifier="MENU"
                                shadowColor="#000"
                                shadowOpacity={0.4}
                                shadowRadius={5}
                                shadowOffset={{
                                  width: 0,
                                  height: 0,
                                }}
                                maxHeight={maxHeight}
                                {...restProps}
                              >
                                {children}
                              </Box>
                            </div>
                          );
                        }}
                      </Area>
                    );
                  }}
                </Boundary>
              </Portal>
            )
          );
        }}
      </MenuConsumer>
    );
  }
}

export default MenuContent;
