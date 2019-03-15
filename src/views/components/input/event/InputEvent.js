import React, { Component } from 'react';
import { array, string, object } from 'prop-types';
import { Text, EventTouchable } from '../../index';

class InputEvent extends Component {
  static propTypes = {
    items: array.isRequired,
    color: string,
    question: object,
    rootQuestionGroupCode: string,
    messageType: string,
  }

  render() {
    const {
      question,
      messageType,
      rootQuestionGroupCode,
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
        <Text
          {...restProps}
          text={question.name}
        />
      </EventTouchable>
    );
  }
}

export default InputEvent;
