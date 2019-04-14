import React, { Component } from 'react';
import { node, string, object } from 'prop-types';
import { isObject } from '../../../../utils';
import { Box, Portal, Boundary, Area } from '../../index';
import MenuConsumer from '../consumer';

class MenuContent extends Component {
  static propTypes = {
    children: node.isRequired,
    testID: string,
    style: object,
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
    const { children, testID, style } = this.props;

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
                            <div
                              ref={ref => {
                                this.input = ref;
                                areaProps.setObserve( ref );
                                setRef( ref, 'menu' );
                              }}
                              tabIndex="-1"
                              style={{
                                top: top,
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
                                {...style}
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
