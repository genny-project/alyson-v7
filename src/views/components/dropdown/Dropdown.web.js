import React, { Component, isValidElement } from 'react';
import { array, bool, object, any, string } from 'prop-types';
import { Menu, MenuButton, MenuItem, MenuList, MenuLink } from '@reach/menu-button';
import { withRouter } from 'react-router-dom';
import { isArray, isString, Bridge } from '../../../utils';
import './Dropdown.css';

const styles = {
  menuButtonStyle: {
    backgroundColor: 'transparent',
    border: 0,
    padding: 10,
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
  }

  handleSelect = item => () => {
    if ( item.buttonCode ) {
      const {
        value ,
        buttonCode,
        messageType = 'BTN',
        eventType = 'BTN_CLICK',
      } = item;

      const valueString = (
        value &&
        typeof value === 'string'
      )
        ? value
        : JSON.stringify( value );

      Bridge.sendEvent({
        event: messageType,
        eventType,
        sendWithToken: true,
        data: {
          code: buttonCode,
          value: valueString || null,
        },
      });

      // if ( this.props.onPress ) this.props.onPress();
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
      facingRight,
      disabled,
      children,
      testID,
      color,
    } = this.props;

    return (
      <Menu>
        <MenuButton
          onClick={( e ) => {
            e.stopPropagation();
            // TODO stop propagation wont work with onPress, as they are different event types.
          }}
          disabled={disabled || !isArray( items, { ofMinLength: 1 })}
          style={{
            ...styles['menuButtonStyle'],
            color,
          }}
          data-testID={`dropdown ${testID}`}
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
        </MenuButton>

        {isArray( items, { ofMinLength: 1 }) && (
          <MenuList
            style={{
              position: 'absolute',
              top: '100%',
              ...facingRight
                ? { right: 0 }
                : { left: 0 },
              ...{
                ...styles['menuListStyle'],
                color,
              },
            }}
          >
            {items.map( item => {
              if ( item.href ) {
                return (
                  <MenuLink
                    key={item.text}
                    data-testID={`dropdown-item ${testID}`}
                    to={(
                      item.href === 'home' ? '/'
                      : item.href.startsWith( '/' ) ? item.href
                      : `/${item.href}`
                    )}
                    style={{
                      ...styles['menuItemStyle'],
                      ...styles['menuLinkStyle'],
                      color,
                    }}
                    onClick={this.handleNavigate( item )}
                  >
                    {item.text}
                  </MenuLink>
                );
              }

              return (
                <MenuItem
                  key={item.text}
                  style={{
                    ...styles['menuItemStyle'],
                    color,
                  }}
                  data-testID={`dropdown-item ${testID}`}
                  onSelect={this.handleSelect( item )}
                >
                  {isValidElement( item.children ) ? item.children
                  : isString( item.text ) ? item.text
                  : isArray( item.children )
                    ? item.children.map(( child ) => (
                      isValidElement( child )
                        ? child
                        : null
                    ))
                    : null
                  }
                </MenuItem>
              );
            })}
          </MenuList>
        )}
      </Menu>
    );
  }
}

export default withRouter( Dropdown );
