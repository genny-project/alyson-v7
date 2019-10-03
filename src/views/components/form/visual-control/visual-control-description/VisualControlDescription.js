import React, { Component } from 'react';
import { string } from 'prop-types';
// import { isArray } from '../../../../../../utils';
import { Box, Text } from '../../../../components';

class VisualControlDescription extends Component {
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
        paddingBottom={5}
        componentID="VCL-DESCRIPTION"
        componentCode={questionCode}
        {...restProps}
      >
        <Text
          size="xxs"
          text="Description text goes here"
          componentID="VCL-DESCRIPTION"
          componentCode={questionCode}
          {...restProps}
        />
      </Box>
    );
  }
}

export default VisualControlDescription;
