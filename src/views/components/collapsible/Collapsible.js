import React, { Component } from 'react';
import { any, bool, func, string, object, node, oneOf } from 'prop-types';
import { Box, Icon, Touchable, Menu, MenuButton, MenuContent, Fragment }  from '../../components';

class Collapsible extends Component {
  static defaultProps = {
    showHeader: true,
    testID: 'collapsible',
    wrapperProps: {},
    headerWrapperProps: {},
    headerIconProps: {},
    iconPlacement: 'right',
    inline: true,
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
    inline: bool,
    disabled: bool,
    color: string,
    backgroundColor: string,
  }

  state = {
    isOpen: false,
  }

  handlePress = () => {
    this.setState( state => ({ isOpen: !state.isOpen }));
  }

  render() {
    const {
      children,
      showHeader,
      testID,
      wrapperProps,
      headerWrapperProps,
      headerIconProps,
      renderHeader,
      isClosed,
      iconPlacement,
      inline,
      disabled,
      color,
      backgroundColor,
    } = this.props;

    const { isOpen } = this.state;

    if ( inline ) {
      return (
        <Box
          justifyContent="center"
          flexDirection="column"
          {...wrapperProps}
        >
          {showHeader
            ? (
              <Box
                // header wrapper styling here?
                flex={1}
                justifyContent="space-between"
                flexDirection={`row${iconPlacement === 'right' ? '' : '-reverse'}`}
              >
                {/* header alt goes here */}
                {renderHeader}
                {
                  !isClosed
                    ? (
                      <Touchable
                        withFeedback
                        onPress={this.handlePress}
                        testID={testID}
                      >
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
                      </Touchable>
                    ) : null
                  }
              </Box>
            ) : null
          }
          {isOpen && !isClosed ? (
            React.Children.map( children, child => (
              React.cloneElement( child, {
                ...child.props,
                isOpen: isOpen,
              })
            ))
          ) : null}
        </Box>
      );
    }

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
                  // ...styles['menuButtonStyle'],
                  color,
                }}
                data-testid={testID}
                testID={testID}
                // onMouseEnter={this.handleMouseEnter( 'button' )}
                // onMouseLeave={this.handleMouseLeave}
              >
                {showHeader
                  ? (
                    <Box
                      // header wrapper styling here?
                      flex={1}
                      justifyContent="space-between"
                      flexDirection={`row${iconPlacement === 'right' ? '' : '-reverse'}`}
                    >
                      {/* header alt goes here */}
                      {renderHeader}
                      {
                        !isClosed
                          ? (
                            // <Touchable
                            //   withFeedback
                            //   // onPress={this.handlePress}
                            //   onPress={this.handleToggle}
                            //   testID={testID}
                            // >
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
                            // </Touchable>
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
                      // ...styles['menuListStyle'],
                      color,
                      backgroundColor,
                      // backgroundColor: '#999',
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

export default Collapsible;
