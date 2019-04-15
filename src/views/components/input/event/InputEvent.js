import React, { Component } from 'react';
import { string, object, func, bool } from 'prop-types';
import { Text, EventTouchable, Icon, Box } from '../../index';
import { isString } from '../../../../utils';

class InputEvent extends Component {
  static propTypes = {
    color: string,
    question: object,
    parentGroupCode: string,
    rootQuestionGroupCode: string,
    messageType: string,
    icon: string,
    onPress: func,
    isClosed: bool,
    ask: object,
    value: object,
  }

  render() {
    const {
      question,
      messageType,
      parentGroupCode,
      rootQuestionGroupCode,
      icon,
      onPress, // eslint-disable-line no-unused-vars
      color,
      ask,
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
        flex={1}
        justifyContent={this.props.isClosed ? 'center' : 'flex-start'}
        value={{
          targetCode: ask.targetCode,
          ...this.props.value,
        }}
      >
        {
          isString( icon, { ofMinLength: 1 })
            ? (
              <Icon
                color={color}
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
                color={color}
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
