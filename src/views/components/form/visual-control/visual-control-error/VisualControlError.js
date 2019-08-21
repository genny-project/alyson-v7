import React, { Component } from 'react';
import { string } from 'prop-types';
// import { isArray } from '../../../../../../utils';
import { Box, Text } from '../../../../components';

class VisualControlError extends Component {
  static propTypes = {
    error: string,
  }

  render() {
    const {
      error,
      ...restProps
    } = this.props;

    return (
      <Box
        flexDirection="column"
        {...restProps}
      >
        <Text
          size="xxs"
          color="red"
          text={error}
          {...restProps}
        />
      </Box>
    );
  }
}

export default VisualControlError;
