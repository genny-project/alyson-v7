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

  applyStyleForNextAndCancel= () => {
    return this.props.question && this.props.question.attributeCode ? 
      ({ 
        backgroundColor: '#dddddd',
        height: '40px',
        width: '200px',
        color: 'green',
        borderWidth: '1px',
        broderColor: 'black',
        borderStyle: 'solid',
      }) : null;
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
      <SubcomponentThemeHandler
        subcomponentProps={this.props.subcomponentProps}
        editable={this.props.editable}
        disabled={this.props.disabled}
        error={this.props.error}
      >
        {({
          componentProps,
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
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              {...this.applyStyleForNextAndCancel()}

            >
              <Box
                flexDirection="row"
                alignItems="center"
                flex={1}
                justifyContent={this.props.isClosed ? 'center' : 'flex-start'}
                {...componentProps['input-wrapper']}
              >
                { hasIcon
                  ? (
                    <Icon
                      name={icon}
                      color="black"
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
                      />
                    ) : null
                }
              </Box>
            </EventTouchable>
          );
        }
        }
      </SubcomponentThemeHandler>
    );
  }
}

export default InputEvent;
