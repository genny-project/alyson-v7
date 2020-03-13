import React, { Component } from 'react';
import { any, bool, func, string, object, node, oneOf } from 'prop-types';
import { Box, Icon, Menu, MenuButton, MenuContent, Fragment }  from '../../components';

class Dropdown extends Component {
  static defaultProps = {
    testID: 'collapsible',
    wrapperProps: {},
    headerWrapperProps: {},
    headerIconProps: {},
    iconPlacement: 'right',
    showIcon: true,
  }

  static propTypes = {
    children: any,
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
    subcomponentProps: object,
    showIcon: bool,
    questionCode: string,
    allowHoverEvents: bool,
    allowPressEvents: bool,
  }

  render() {
    const {
      children,
      testID,
      renderHeader,
      isClosed,
      iconPlacement,
      disabled,
      color,
      showIcon,
      questionCode,
      // backgroundColor,
      subcomponentProps,
      allowHoverEvents,
      allowPressEvents,
    } = this.props;

    return (
      <Menu
        identifier={testID}
      >
        {({ isOpen }) => {
          return (
            <Fragment>
              <Box
                justifyContent="center"
                flexDirection="column"
                componentID="GROUP-HEADER-WRAPPER"
                componentCode={questionCode}
                {...subcomponentProps['group-header-wrapper']}
              >
                <Box
                  flex={1}
                  justifyContent="space-between"
                  flexDirection={`row${iconPlacement === 'right' ? '' : '-reverse'}`}
                >
                  {!isClosed
                    ? (
                      <MenuButton
                        disabled={disabled}
                        allowHoverEvents={allowHoverEvents}
                        allowPressEvents={allowPressEvents}
                        style={{
                          color,
                        }}
                        data-testid={testID}
                        testID={testID}
                        questionCode={questionCode}
                        {...subcomponentProps['group-clickable-wrapper']}
                      >
                        {renderHeader}
                        {showIcon ? (
                          <Box
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Box
                              transform={[
                                { rotate: isOpen ? '0deg' : '270deg' },
                              ]}
                              componentID="GROUP-ICON"
                              componentCode={questionCode}
                              {...subcomponentProps['group-icon']}
                            >
                              <Icon
                                name="keyboard_arrow_down"
                                color="black"
                                cursor="pointer"
                                componentID="GROUP-ICON"
                                componentCode={questionCode}
                                {...subcomponentProps['group-icon']}
                              />
                            </Box>
                          </Box>
                        ) : null}
                      </MenuButton>
                    ) : null }
                </Box>
              </Box>

              {(
                <MenuContent
                  ref={input => this.input = input}
                  identifier={testID}
                  {...subcomponentProps['group-content-wrapper']}
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
