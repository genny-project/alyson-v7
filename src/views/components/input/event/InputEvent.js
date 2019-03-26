import React, { Component } from 'react';
import { array, string, object, func, bool } from 'prop-types';
import { Text, EventTouchable, Icon, Box } from '../../index';
import { isString } from '../../../../utils';

class InputEvent extends Component {
  static propTypes = {
    items: array.isRequired,
    color: string,
    question: object,
    parentGroupCode: string,
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
      parentGroupCode,
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
        code={question.code}
        parentCode={parentGroupCode}
        rootCode={rootQuestionGroupCode}
        flexDirection="row"
        alignItems="center"
      >
        {
          isString( icon, { ofMinLength: 1 })
            ? (
              <Icon
                name={icon}
              />
            ) : null
        }
        <Box
          paddingRight={5}
        />
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
