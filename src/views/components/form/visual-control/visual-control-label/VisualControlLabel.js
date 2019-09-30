import React, { Component } from 'react';
import { object, string } from 'prop-types';
// import { isArray } from '../../../../../../utils';
import { Box, Text } from '../../../../components';

class VisualControlLabel extends Component {
  static propTypes = {
    question: object,
    questionCode: string,
  }

  render() {
    const {
      question,
      questionCode,
      ...restProps
    } = this.props;

    return (
      <Box
        {...restProps}
      >
        <Text
          size="xs"
          text={question.name}
          componentID="VCL-LABEL"
          componentCode={questionCode}
          {...restProps}
        />
      </Box>
    );
  }
}

export default VisualControlLabel;
