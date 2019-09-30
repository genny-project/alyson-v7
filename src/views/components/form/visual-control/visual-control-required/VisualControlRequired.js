import React, { Component } from 'react';
import { string } from 'prop-types';
// import { isArray } from '../../../../../../utils';
import { Box, Text } from '../../../../components';

class VisualControlRequired extends Component {
  static propTypes = {
    questionCode: string,
  }

  render() {
    const {
      questionCode,
      ...restProps
    } = this.props;

    return (
      <Box
        paddingLeft={5}
        marginRight="auto"
        componentID="VCL-REQUIRED"
        componentCode={questionCode}
      >
        <Text
          text="*"
          color="red"
          componentID="VCL-REQUIRED"
          componentCode={questionCode}
          {...restProps}
        />
      </Box>
    );
  }
}

export default VisualControlRequired;
