import React, { Component, isValidElement } from 'react';
import { array, bool, object, any, string, func } from 'prop-types';
// import { Menu, MenuButton, MenuItem, MenuList, MenuLink } from '@reach/menu-button';
import { withRouter } from 'react-router-dom';
import { isArray, isString, isObject, Bridge } from '../../../utils';
import { Fragment, Icon, Box, TestIdHandler, Text,
  Menu, MenuButton, MenuItem, MenuContent,
} from '../index';
import './Dropdown.css';

const styles = {
  menuButtonStyle: {
    backgroundColor: 'transparent',
    border: 0,
    // padding: 10,
    fontSize: 16,
    cursor: 'pointer',
    color: 'black',
  },
  menuListStyle: {
    // background: '#bbb',
    borderWidth: 2,
    borderColor: '#black',
    borderStyle: 'solid',
    padding: 5,
  },
  menuLinkStyle: {
    textAlign: 'right',
    padding: 15,
    color: 'black',
  },
};

class Dropdown extends Component {
  static propTypes = {
    items: array.isRequired,
    text: any,
    facingRight: bool,
    disabled: bool,
    testID: string,
    children: any,
    history: object,
    color: string,
    backgroundColor: string,
    iconProps: object,
    onChangeState: func,
  }

  inputs = {};

  state = {
    isHovering: false,
  }

  focus() {
    if ( this.inputs && this.inputs[0] )
      this.inputs[0].focus();
  }

  blur() {
    if ( this.inputs && this.inputs[0] )
      this.input[0].blur();
  }

  handleMouseEnter = () => {
    this.setState({
      isHovering: true,
    });

    if ( this.props.onChangeState )
      this.props.onChangeState({ hover: true });
  }

  handleMouseLeave = () => {
    this.setState({
      isHovering: false,
    });

    if ( this.props.onChangeState )
      this.props.onChangeState({ hover: false });
  }

  handleSelect = item => () => {
    if (
      item.code &&
      item.parentCode
    ) {
      Bridge.sendFormattedEvent(
        item
      );
    }
  }

  handleNavigate = item => event => {
    event.preventDefault();

    const href = (
      item.href === 'home' ? '/'
      : item.href.startsWith( '/' ) ? item.href
      : `/${item.href}`
    );

    this.props.history.push( href );

    return false;
  }

  render() {
    const {
      items,
      text,
      // facingRight,
      disabled,
      children,
      testID,
      color,
      backgroundColor,
      iconProps,
    } = this.props;
    const { isHovering } = this.state; // eslint-disable-line no-unused-vars

    return (
      <Menu
        identifier={testID}
      >
        {({ isOpen }) => {
          return (
            <Fragment>
              <TestIdHandler
                testID={testID}
              >
                <MenuButton
                  disabled={disabled || !isArray( items, { ofMinLength: 1 })}
                  style={{
                    ...styles['menuButtonStyle'],
                    color,
                  }}
                  data-testid={testID}
                  testID={testID}
                >
                  <Box
                    justifyContent="space-between"
                    id={`element-${testID}`}
                  >
                    {isValidElement( children ) ? children
                    : isString( text ) ? text
                    : isArray( children )
                      ? children.map(( child ) => (
                        isValidElement( child )
                          ? child
                          : null
                      ))
                      : null
                    }
                    <Box
                      justifyContent="center"
                      transform={[
                        { rotate: isOpen ? '0deg' : '270deg' },
                      ]}
                    >
                      <Box
                        paddingTop={2}
                      >
                        <Icon
                          name="expand_more"
                          color={this.props.color || 'black'}
                          size="xs"
                        />
                      </Box>
                    </Box>
                  </Box>
                </MenuButton>
              </TestIdHandler>

              {isArray( items, { ofMinLength: 1 }) && (
                <MenuContent
                  style={{
                    ...{
                      ...styles['menuListStyle'],
                      color,
                      backgroundColor,
                    },
                  }}
                  ref={input => this.input = input}
                  testID={testID}
                  identifier={testID}
                >
                  {items.map(( item, index ) => {
                    const hasIcon = isObject( iconProps ) &&
                      isString( item.icon, { ofMinLength: 1 });

                    return (
                      <MenuItem
                        key={item.text}
                        ref={input => this.inputs[index] = input}
                        onPress={item.href
                          ? this.handleNavigate( item )
                          : this.handleSelect( item )
                        }
                        id={index}
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                        {...item.style}
                      >
                        <TestIdHandler
                          testID={`${item.parentCode}:${item.code}`}
                        >
                          { hasIcon
                            ? (
                              <Box
                                paddingRight={5}
                              >
                                <Icon
                                  name={item.icon}
                                  color="black"
                                  {...iconProps}
                                />
                              </Box>
                            ) : null
                          }
                          {
                            isString( item.text, { isNotSameAs: ' ' })
                              ? (
                                <Text
                                  color={color}
                                  whiteSpace="nowrap"
                                  text={item.text}
                                  {...item.style}
                                />
                              ) : null
                          }
                        </TestIdHandler>
                      </MenuItem>
                    );
                  })}
                </MenuContent>
              )}
            </Fragment>
          );
        }}
      </Menu>
    );
  }
}

export default withRouter( Dropdown );
