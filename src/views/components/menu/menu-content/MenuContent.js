import React, { Component } from 'react';
import { node, string, number, oneOf } from 'prop-types';
import { isObject, isInteger } from '../../../../utils';
import { Box, Portal, Boundary, Area } from '../../index';
import MenuConsumer from '../consumer';

class MenuContent extends Component {
  static defaultProps = {
    offsetX: 0,
    offsetY: 0,
    position: 'left',
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
  }

  focus() {
    if ( this.input )
      this.input.focus();
  }

  handleLayout = () => {
    if ( this.input ) {
      this.input.focus();
    }
  }

  handleRef = input => {
    this.input = input;
  }

  render() {
    const { children, testID, offsetX, offsetY, position, ...restProps } = this.props;

    // console.log( this.input );

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
            isOpen && (
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

                          return (
                            <div
                              ref={ref => {
                                this.input = ref;
                                areaProps.setObserve( ref );
                                setRef( ref, 'menu' );
                              }}
                              tabIndex="-1"
                              style={{
                                position: 'absolute',
                                top: isInteger( y ) ? y : top,
                                left: isInteger( x ) ? x : positions[position],
                                ...( isInteger( x ) ? {} : { transform: `translateX( -${position === 'right' ? 100 : position === 'center' ? 50 : 0}%)` }),
                              }}
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
