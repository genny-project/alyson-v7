import React, { Component } from 'react';
import range from 'lodash.range';
import { string, number, bool, object } from 'prop-types';
import { isObject, isString, isInteger } from '../../../../utils';
import { Box, Text, Icon, Fragment } from '../..';
import { SubcomponentThemeHandler } from '../../form/theme-handlers';

const ProgressBar = ( inputFieldProps ) => {
  const {
    sections,
    value,
    color = '#888',
    height = 20,
    showValue,
  } = inputFieldProps;

  return (
    <Box
      width="100%"
      height={height}
      position="relative"
      overflow="hidden"
      {...inputFieldProps}
    >
      {
        isInteger( sections )
          ? (
            <Box
              width="100%"
              height="100%"
              position="absolute"
              top={0}
              left={0}
            >
              {
                range(( sections * 2 ) - 1 ).map( section => {
                  const isSection = section % 2 === 0;

                  return (
                    <Box
                      key={section}
                      flex={isSection ? 2 : 1}
                      backgroundColor={
                        isSection
                          ? parseInt( value, 10 ) > ( 100 / sections ) * ( section / 2 )
                            ? color
                            : '#ddd'
                          : null
                      }
                    />
                  );
                })
              }
            </Box>
          )
          : (
            <Fragment>
              <Box
                width="100%"
                height="100%"
                backgroundColor="#ddd"
              />
              <Box
                width={value}
                height="100%"
                backgroundColor={color}
                position="absolute"
                top={0}
                left={0}
                transitionDuration="1000ms"
                transitionProperty="width"
                transitionTimingFunction="ease"
              />
            </Fragment>
          )
      }
      {
        showValue ? (
          <Box
            width="100%"
            height="100%"
            position="absolute"
            top={0}
            left={0}
            justifyContent="center"
            alignItems="center"
          >
            <Text
              text={value}
              size="xs"
            />
          </Box>
        ) : null
      }
    </Box>
  );
};

class Progress extends Component {
  static defaultProps = {
    // sections: 24,
  }

  static propTypes = {
    // onChange: func,
    // onChangeValue: func,
    // onChangeState: func,
    // onRef: func,
    value: string,
    sections: number,
    icon: string,
    iconProps: object,
    hasIcon: bool,
    question: object,
    ask: object,
    // size: oneOf(
    //   ['xs','sm','md','lg','xl']
    // ),
    editable: bool,
    error: string,
    disabled: bool,
    subcomponentProps: object,
  }

  state = {}

  render() {
    const {
      value,
      sections,
      iconProps,
      icon,
      question,
      editable,
      disabled,
      error,
      subcomponentProps,
    } = this.props;

    const hasIcon = isObject( iconProps ) && isString( icon, { ofMinLength: 1 });

    return (
      <SubcomponentThemeHandler
        subcomponentProps={subcomponentProps}
        editable={editable}
        disabled={disabled}
        error={error}
      >
        {({
          componentProps,
        }) => {
          return (
            <Box
              flex={1}
              flexDirection="column"
              componentID="INPUT-WRAPPER"
              componentCode={question.code}
              {...componentProps['input-wrapper']}
            >
              { hasIcon
                ? (
                  <Box
                    pointerEvents="none"
                    {...iconProps}
                  >
                    <Icon
                      name={icon}
                      color="black"
                      componentID="INPUT-ICON"
                      componentCode={question.code}
                      {...iconProps}
                    />
                  </Box>
                ) : null
              }
              <ProgressBar
                value={value}
                sections={sections}
                {...componentProps['input-field']}
              />
            </Box>
          );
        }}
      </SubcomponentThemeHandler>
    );
  }
}

export default Progress;
