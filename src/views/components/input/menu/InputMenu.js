import React, { Component } from 'react';
import { array, string, object } from 'prop-types';
import { isArray } from '../../../../utils';
import { Text, Dropdown } from '../../index';

class InputMenu extends Component {
  static propTypes = {
    items: array.isRequired,
    color: string,
    rootQuestionGroupCode: string,
    question: object,
  }

  render() {
    const {
      items,
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
            // eventType: 'TV_SELECT',
            // messageType: 'TV_EVENT',
          }))
          : null}
      >
        <Text
          color={this.props.color}
          text={question.name}
        />
      </Dropdown>
    );
  }
}

export default InputMenu;
