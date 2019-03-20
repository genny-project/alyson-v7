import React, { Component } from 'react';
import { array, string, object } from 'prop-types';
import { isArray, isString } from '../../../../utils';
import { Text, Dropdown, Icon } from '../../index';

class InputMenu extends Component {
  static propTypes = {
    items: array.isRequired,
    color: string,
    rootQuestionGroupCode: string,
    question: object,
    icon: string,
  }

  render() {
    const {
      items,
      icon,
      ...restProps
    } = this.props;
    const { question } = this.props;

    return (
      <Dropdown
        {...restProps}
        items={isArray( items )
          ? items.map( item => ({
            text: item.label,
            icon: 'person',
            value: item.value,
            buttonCode: this.props.rootQuestionGroupCode,
            style: item.style,
            // eventType: 'TV_SELECT',
            // messageType: 'TV_EVENT',
          }))
          : null}
      >
        {
          isString( icon, { ofMinLength: 1 })
            ? (
              <Icon
                name={icon}
              />
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
