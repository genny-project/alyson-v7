import React, { Component } from 'react';
import { object, string, bool } from 'prop-types';
// import { isArray } from '../../../../../../utils';
import { Box, Text } from '../../../../components';

class VisualControlLabel extends Component {
  static propTypes = {
    question: object,
    questionCode: string,
    showRequired: bool,
  }

  render() {
    const {
      question,
      questionCode,
      showRequired,
      ...restProps
    } = this.props;

    return (
      <Box
        flexGrow={0}
        flexShrink={0}
        flexBasis="auto"
        {...restProps}
      >
        <Text
          size="xs"
          text={`${question.name}${showRequired ? '*' : ''}`}
          componentID="VCL-LABEL"
          componentCode={questionCode}
          {...restProps}
        />
      </Box>
    );
  }
}

export default VisualControlLabel;
