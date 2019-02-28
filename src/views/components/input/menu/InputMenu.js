import React, { Component } from 'react';
import { array, bool, object, any, string } from 'prop-types';
import { isArray, isString, Bridge } from '../../../../utils';
import { Text, Dropdown, Icon, Box } from '../../index';

class InputMenu extends Component {
  static propTypes = {
    items: array.isRequired,
    color: string,
    rootQuestionGroupCode: string,
  }

  render() {
    const {
      items,
      ...restProps
    } = this.props;

    return (
      <Dropdown
        {...restProps}
        items={isArray( items )
          ? items.map( item => ({
            text: item.label,
            icon: 'person',
            value: item.value,
            buttonCode: this.props.rootQuestionGroupCode,
            eventType: 'TV_SELECT',
            messageType: 'TV_EVENT',
            ...item.value === 'SEL_USER_OPTIONS_LOGOUT' ? { href: 'logout' } : {}, // TODO remove when backend handles logout event
          }))
          : null}
      >
        <Box
          alignItems="center"
          paddingRight={5}
        >
          <Text
            color={this.props.color}
            text="Menu Input"
          />
          <Icon
            name="expand_more"
            color={this.props.color || 'black'}
            size="xs"
          />
        </Box>
      </Dropdown>
    );
  }
}

export default InputMenu;
