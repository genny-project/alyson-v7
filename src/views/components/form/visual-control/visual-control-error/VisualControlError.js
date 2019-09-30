import React, { Component } from 'react';
import { string } from 'prop-types';
// import { isArray } from '../../../../../../utils';
import { Box, Text } from '../../../../components';

class VisualControlError extends Component {
  static propTypes = {
    error: string,
    questionCode: string,
  }

  render() {
    const {
      error,
      questionCode,
      ...restProps
    } = this.props;

    return (
      <Box
        flexDirection="column"
        componentID="VCL-ERROR"
        componentCode={questionCode}
        {...restProps}
      >
        <Text
          size="xxs"
          color="red"
          text={error}
          componentID="VCL-ERROR"
          componentCode={questionCode}
          {...restProps}
        />
      </Box>
    );
  }
}

export default VisualControlError;
