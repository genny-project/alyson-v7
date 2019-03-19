import React, { Component } from 'react';
import { array, string, object } from 'prop-types';
import { Text, EventTouchable, Icon } from '../../index';
import { isString } from '../../../../utils';

class InputEvent extends Component {
  static propTypes = {
    items: array.isRequired,
    color: string,
    question: object,
    rootQuestionGroupCode: string,
    messageType: string,
    icon: string,
  }

  render() {
    const {
      question,
      messageType,
      rootQuestionGroupCode,
      icon,
      ...restProps
    } = this.props;
    // const { contextList } = question;

    // get eventType from somewhere in the question

    return (
      <EventTouchable
        {...restProps}
        withFeedback
        eventType={messageType}
        value={question.code}
        buttonCode={rootQuestionGroupCode}
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
          isString( question.name, { ofMinLength: 1 })
            ? (
              <Text
                {...restProps}
                text={question.name}
              />
            ) : null
        }

      </EventTouchable>
    );
  }
}

export default InputEvent;
