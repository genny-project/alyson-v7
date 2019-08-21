import React, { Component } from 'react';
import { node, string } from 'prop-types';
import { isObject, isInteger } from '../../../../utils';
import { Box, Portal, Boundary, Area } from '../../index';
import MenuConsumer from '../consumer';

class MenuContent extends Component {
  static propTypes = {
    children: node.isRequired,
    testID: string,
  }

  positionX = null;
  positionY = null;

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
    const { children, testID, ...restProps } = this.props;

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
                          console.log( '--------------------------' );
                          const x = isObject( boundaryAdjustedArea, { withProperty: 'left' }) ? boundaryAdjustedArea.left : null;
                          const y = isObject( boundaryAdjustedArea, { withProperty: 'top' }) ? boundaryAdjustedArea.top : null;

                          const shouldUseBoundaryAdjustedX = isInteger( x, { isLessThanOrEqualTo: buttonArea.left });
                          const shouldUseBoundaryAdjustedY = isInteger( y, { isLessThanOrEqualTo: buttonArea.bottom });

                          console.log( 'adjusted', x, y, 'buttonArea', buttonArea.left, buttonArea.bottom );
                          console.log( 'shouldUseBoundaryAdjusted', shouldUseBoundaryAdjustedX, shouldUseBoundaryAdjustedY );

                          const left = shouldUseBoundaryAdjustedX ? x : buttonArea.left;
                          const top = shouldUseBoundaryAdjustedY ? y : buttonArea.bottom;

                          console.log( 'values', left, top );

                          return (
                            <div
                              ref={ref => {
                                this.input = ref;
                                areaProps.setObserve( ref );
                                setRef( ref, 'menu' );
                              }}
                              tabIndex="-1"
                              style={{
                                top: top /* + this.props.offsetY */,
                                left: left,
                                position: 'absolute',

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
