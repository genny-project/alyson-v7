import React, { Component } from 'react';
import { array, string, object } from 'prop-types';
import { Text, EventTouchable } from '../../index';

class InputEvent extends Component {
  static propTypes = {
    items: array.isRequired,
    color: string,
    question: object,
    rootQuestionGroupCode: string,
  }

  render() {
    const {
      question,
      rootQuestionGroupCode,
      ...restProps
    } = this.props;

    return (
      <EventTouchable
        {...restProps}
        withFeedback
        eventType="TV_SELECT"
        messageType="TV_EVENT"
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
