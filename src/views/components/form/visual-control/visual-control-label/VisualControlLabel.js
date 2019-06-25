import React, { Component } from 'react';
import { string, object, bool, number, func } from 'prop-types';
// import { isArray } from '../../../../../../utils';
import { Box, Text, Icon, Touchable } from '../../../../components';

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
