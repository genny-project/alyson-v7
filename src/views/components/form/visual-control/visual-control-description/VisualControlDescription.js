import React, { Component } from 'react';
import { string } from 'prop-types';
// import { isArray } from '../../../../../../utils';
import { Box, Text } from '../../../../components';

class VisualControlDescription extends Component {
  static propTypes = {
    questionCode: string,
    text: string,
  }

  render() {
    const {
      questionCode,
      text,
      ...restProps
    } = this.props;

    return (
      <Box
        paddingBottom={5}
        componentID="VCL-DESCRIPTION"
        componentCode={questionCode}
        paddingTop={4}
        paddingLeft={4}
        {...restProps}
      >
        <Text
          size="xxs"
          color="#888"
          text={text}
          componentID="VCL-DESCRIPTION"
          componentCode={questionCode}
          {...restProps}
        />
      </Box>
    );
  }
}

export default VisualControlDescription;
