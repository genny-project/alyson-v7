import React, { Component } from 'react';
import { any, bool, func, string, object, node, oneOf } from 'prop-types';
import { Box, Icon, Menu, MenuButton, MenuContent, Fragment }  from '../../components';

class Dropdown extends Component {
  static defaultProps = {
    showHeader: true,
    testID: 'collapsible',
    wrapperProps: {},
    headerWrapperProps: {},
    headerIconProps: {},
    iconPlacement: 'right',
  }

  static propTypes = {
    children: any,
    showHeader: bool,
    // open: bool,
    onToggle: func,
    testID: string,
    wrapperProps: object,
    headerWrapperProps: object,
    headerIconProps: object,
    renderHeader: node,
    isClosed: bool,
    iconPlacement: oneOf(
      ['left', 'right']
    ),
    disabled: bool,
    color: string,
    backgroundColor: string,
  }

  render() {
    const {
      children,
      showHeader,
      testID,
      headerWrapperProps,
      headerIconProps,
      renderHeader,
      isClosed,
      iconPlacement,
      disabled,
      color,
      backgroundColor,
    } = this.props;

    return (
      <Menu
        identifier={testID}
      >
        {({ isOpen }) => {
          return (
            <Fragment>
              <MenuButton
                disabled={disabled}
                style={{
                  color,
                }}
                data-testid={testID}
                testID={testID}
              >
                {showHeader
                  ? (
                    <Box
                      flex={1}
                      justifyContent="space-between"
                      flexDirection={`row${iconPlacement === 'right' ? '' : '-reverse'}`}
                    >
                      {/* header alt goes here */}
                      {renderHeader}
                      {
                        !isClosed
                          ? (
                            <Box
                              justifyContent="center"
                              alignItems="center"
                              {...headerWrapperProps}
                            >
                              <Box
                                transform={[
                                  { rotate: isOpen ? '0deg' : '270deg' },
                                ]}
                                {...headerWrapperProps}
                              >
                                <Icon
                                  name="keyboard_arrow_down"
                                  color="black"
                                  cursor="pointer"
                                  {...headerIconProps}
                                />
                              </Box>
                            </Box>
                          ) : null
                        }
                    </Box>
                  ) : null
                }
              </MenuButton>

              {(
                <MenuContent
                  style={{
                    ...{
                      color,
                      backgroundColor,
                    },
                  }}
                  ref={input => this.input = input}
                  identifier={testID}
                >
                  {(
                    React.Children.map( children, child => (
                      React.cloneElement( child, {
                        ...child.props,
                        isOpen: isOpen,
                      })
                    ))
                  )}
                </MenuContent>
              )}
            </Fragment>
          );
        }}
      </Menu>
    );
  }
}

export default Dropdown;
