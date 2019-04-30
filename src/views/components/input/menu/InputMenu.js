import React, { Component } from 'react';
import { array, string, object } from 'prop-types';
import { isArray, isString, isObject } from '../../../../utils';
import { Text, Dropdown, Icon, Box } from '../../index';

class InputMenu extends Component {
  static propTypes = {
    items: array.isRequired,
    color: string,
    parentGroupCode: string,
    rootQuestionGroupCode: string,
    question: object,
    icon: string,
    iconProps: object,
  }

  render() {
    const {
      items,
      icon,
      iconProps,
      parentGroupCode,
      rootQuestionGroupCode,
      ...restProps
    } = this.props;
    const { question } = this.props;

    const hasIcon = isObject( iconProps ) && isString( icon, { ofMinLength: 1 });

    return (
      <Dropdown
        {...restProps}
        ref={input => this.input = input}
        items={isArray( items )
          ? items.map( item => ({
            text: item.label,
            icon: 'person',
            code: item.value,
            parentCode: parentGroupCode,
            rootCode: rootQuestionGroupCode,
            style: item.style,
            // eventType: 'TV_SELECT',
            // messageType: 'TV_EVENT',
            ...item.value === 'SEL_USER_OPTIONS_LOGOUT' ? { href: 'logout' } : {}, // TODO remove when backend handles logout event
          }))
          : null}
      >
        { hasIcon
          ? (
            <Box
              marginRight={5}
              {...iconProps}
            >
              <Icon
                name={icon}
                color="black"
                {...iconProps}
              />
            </Box>
          ) : null
        }
        {
          isString( question.name, { isNotSameAs: ' ' })
            ? (
              <Text
                color={this.props.color}
                text={question.name}
              />
            ) : null
        }
      </Dropdown>
    );
  }
}

export default InputMenu;
