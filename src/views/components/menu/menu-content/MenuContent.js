import React, { Component } from 'react';
import { node, string } from 'prop-types';
import { isObject } from '../../../../utils';
import { Box, Portal, Boundary, Area } from '../../index';
import MenuConsumer from '../consumer';

class MenuContent extends Component {
  static propTypes = {
    children: node.isRequired,
    testID: string,
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
    const { children, testID } = this.props;

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
                          const top = isObject( boundaryAdjustedArea, { withProperty: 'top' }) ? boundaryAdjustedArea.top : isObject( buttonArea ) ? buttonArea.bottom : 50;
                          const left = isObject( boundaryAdjustedArea, { withProperty: 'left' }) ? boundaryAdjustedArea.left : isObject( buttonArea ) ? buttonArea.left : '50vw';

                          return (
                            <Box
                              position="absolute"
                              top={top}
                              left={left}
                              flexDirection="column"
                              onLayout={this.handleLayout}
                              identifier="MENU"
                            >
                              <div
                                ref={ref => {
                                  this.input = ref;
                                  areaProps.setObserve( ref );
                                  setRef( ref, 'menu' );
                                }}
                                tabIndex="-1"
                                style={{}}
                                // onBlur={handleClose}
                                onBlur={handleContentBlur}
                                onFocus={handleContentFocus}
                              >
                                {children}
                              </div>
                            </Box>
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
