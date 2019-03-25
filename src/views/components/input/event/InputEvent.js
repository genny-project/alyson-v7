import React, { Component } from 'react';
import { array, string, object, func, bool } from 'prop-types';
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
    onPress: func,
    isClosed: bool,
  }

  render() {
    const {
      question,
      messageType,
      rootQuestionGroupCode,
      icon,
      onPress, // eslint-disable-line no-unused-vars
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
          isString( question.name, { isNotSameAs: ' ' }) && !(
            this.props.isClosed &&
            isString( icon, { ofMinLength: 1 })
          )
            ? (
              <Text
                {...restProps}
                whiteSpace="nowrap"
                text={question.name}
              />
            ) : null
        }

      </EventTouchable>
    );
  }
}

export default InputEvent;
