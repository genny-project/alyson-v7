import React, { Component } from 'react';
import { bool, string, object } from 'prop-types';
import { Box } from '../..';
// import { isArray, isString, isObject, isInteger } from '../../../../utils';
import { SubcomponentThemeHandler } from '../../form/theme-handlers';

class ColourPicker extends Component {
  static defaultProps = {
    defaultValue: 'orange',
  };

  static propTypes = {
    value: string,
    defaultValue: string,
    subcomponentProps: object,
    editable: bool,
    disabled: bool,
    error: string,
  };

  render() {
    const {
      value,
      defaultValue,
      subcomponentProps,
      // items
      ...restProps
    } = this.props;

    // use dropdown component to render a menu of colours

    return (
      <SubcomponentThemeHandler
        subcomponentProps={subcomponentProps}
        editable={this.props.editable}
        disabled={this.props.disabled}
        error={this.props.error}
      >
        {({
          componentProps,
        }) => {
          return (
            <Box
              borderRadius={10}
              width={10}
              height={100}
              {...componentProps['input-wrapper']}
            >
              <Box
                width="100%"
                height="100%"
                {...restProps}
                {...componentProps['input-field']}
                backgroundColor={value || defaultValue}
              />
            </Box>
          );
        }}
      </SubcomponentThemeHandler>
    );
  }
}

export default ColourPicker;
