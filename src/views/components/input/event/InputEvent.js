import React, { Component } from 'react';
import { array, bool, object, any, string } from 'prop-types';
import { isArray, isString, Bridge } from '../../../../utils';
import { Text, EventTouchable } from '../../index';

class InputEvent extends Component {
  static propTypes = {
    items: array.isRequired,
    color: string,
    rootQuestionGroupCode: string,
  }

  render() {
    const {
      items,
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
