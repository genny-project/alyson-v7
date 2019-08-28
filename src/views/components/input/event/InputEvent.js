import React, { Component } from 'react';
import { string, object, func, bool } from 'prop-types';
import { Text, EventTouchable, Icon, Box } from '../../index';
import { isString, isObject } from '../../../../utils';
import { SubcomponentThemeHandler } from '../../form/theme-handlers';

class InputEvent extends Component {
  static defaultProps = {
    iconOnly: false,
  }

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
    subcomponentProps: object,
    editable: bool,
    error: string,
    disabled: bool,
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
      onChangeState,
      color,
      iconOnly,
      ...restProps
    } = this.props;

    const hasIcon = isObject( iconProps ) && isString( icon, { ofMinLength: 1 });
    const hasText = !iconOnly && isString( question.name, { isNotSameAs: ' ' });

    // get eventType from somewhere in the question

    return (
      <SubcomponentThemeHandler
        subcomponentProps={this.props.subcomponentProps}
        editable={this.props.editable}
        disabled={this.props.disabled}
        error={this.props.error}
      >
        {({
          componentProps,
          updateState,
        }) => {
          return (
            <EventTouchable
              {...restProps}
              withFeedback
              eventType={messageType}
              code={question.code}
              parentCode={parentGroupCode}
              rootCode={rootQuestionGroupCode}
              targetCode={ask.targetCode}
              // onMouseEnter={this.handleMouseEnter}
              // onMouseLeave={this.handleMouseLeave}
              onChangeState={( state ) => {
                updateState( 'input-wrapper' )( state );
                if ( onChangeState )  {
                  onChangeState( state );
                }
              }}
              alignItems="center"
              flex={1}
              justifyContent={this.props.isClosed ? 'center' : 'flex-start'}
              flexDirection="row"
              {...componentProps['input-wrapper']}
            >
              { hasIcon
                ? (
                  <Icon
                    name={icon}
                    color="black"
                    {...restProps}
                    {...iconProps}
                  />
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
                        {...restProps}
                      />
                    ) : null
                }
            </EventTouchable>
          );
        }
        }
      </SubcomponentThemeHandler>
    );
  }
}

export default InputEvent;
