import React, { Component } from 'react';
import { object } from 'prop-types';
// import { isArray } from '../../../../../../utils';
import { Box, Text } from '../../../../components';

class VisualControlLabel extends Component {
  static propTypes = {
    question: object,
  }

  render() {
    const {
      question,
      ...restProps
    } = this.props;

    return (
      <Box
        {...restProps}
      >
        <Text
          size="xs"
          text={question.name}
                    // decoration="underline"
          {...restProps}
        />
      </Box>
    );
  }
}

export default VisualControlLabel;
