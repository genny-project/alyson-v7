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
      // backgroundColor,
      subcomponentProps,
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
                {...subcomponentProps['group-header-wrapper']}
              >
                {/* header alt goes here */}
                <Box
                  // header wrapper styling here?
                  flex={1}
                  justifyContent="space-between"
                  flexDirection={`row${iconPlacement === 'right' ? '' : '-reverse'}`}
                >
                  {/* {renderHeader} */}
                  {!isClosed
                    ? (
                      <MenuButton
                        disabled={disabled}
                        style={{
                          color,
                        }}
                        data-testid={testID}
                        testID={testID}
                        {...subcomponentProps['group-clickable-wrapper']}
                      >
                        {renderHeader}
                        <Box
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Box
                            transform={[
                              { rotate: isOpen ? '0deg' : '270deg' },
                            ]}
                            {...subcomponentProps['group-icon']}
                          >
                            <Icon
                              name="keyboard_arrow_down"
                              color="black"
                              cursor="pointer"
                              {...subcomponentProps['group-icon']}
                            />
                          </Box>
                        </Box>
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
