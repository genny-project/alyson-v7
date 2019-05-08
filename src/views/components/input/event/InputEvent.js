import React, { Component } from 'react';
import { string, object, func, bool } from 'prop-types';
import { Text, EventTouchable, Icon, Box } from '../../index';
import { isString, isObject } from '../../../../utils';

class InputEvent extends Component {
  static propTypes = {
    color: string,
    question: object,
    ask: object,
    parentGroupCode: string,
    rootQuestionGroupCode: string,
    messageType: string,
    iconProps: bool,
    onPress: func,
    icon: string,
    isClosed: bool,
    onChangeState: func,
    iconOnly: bool,
  }

  state = {
    isHovering: false,
  }

  handleMouseEnter = ( event ) => {
    this.setState({
      isHovering: true,
    });

    if ( this.props.onChangeState )
      this.props.onChangeState({ hover: true });

    event.stopPropagation();
  }

  handleMouseLeave = () => {
    this.setState({
      isHovering: false,
    });

    if ( this.props.onChangeState )
      this.props.onChangeState({ hover: false });
  }

  render() {
    const {
      question,
      ask,
      messageType,
      parentGroupCode,
      rootQuestionGroupCode,
      icon,
      iconProps,
      onPress, // eslint-disable-line no-unused-vars
      color,
      iconOnly,
      ...restProps
    } = this.props;
    const { isHovering } = this.state; // eslint-disable-line no-unused-vars

    const hasIcon = isObject( iconProps ) && isString( icon, { ofMinLength: 1 });
    const hasText = !iconOnly && isString( question.name, { isNotSameAs: ' ' });

    // get eventType from somewhere in the question

    return (
      <EventTouchable
        {...restProps}
        withFeedback
        eventType={messageType}
        code={question.code}
        parentCode={parentGroupCode}
        rootCode={rootQuestionGroupCode}
        targetCode={ask.targetCode}
        flexDirection="row"
        alignItems="center"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        flex={1}
        justifyContent={this.props.isClosed ? 'center' : 'flex-start'}
      >
        { hasIcon
          ? (
            <Box>
              <Icon
                name={icon}
                color="black"
                {...iconProps}
              />
            </Box>
          ) : null
        }
        { hasIcon &&
          hasText
          ? (
            <Box
              paddingRight={5}
            />
          ) : null
        }
        {
          hasText && !(
            this.props.isClosed &&
            hasIcon
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
