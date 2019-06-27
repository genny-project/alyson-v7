import React, { Component } from 'react';
// import { string, object, bool, number, func } from 'prop-types';
// import { isArray } from '../../../../../../utils';
import { Box, Text } from '../../../../components';

class VisualControlRequired extends Component {
  static propTypes = {
  }

  render() {
    const {
      ...restProps
    } = this.props;

    return (
      <Box
        paddingLeft={5}
        marginRight="auto"
      >
        <Text
          text="*"
          color="red"
          {...restProps}
        />
      </Box>
    );
  }
}

export default VisualControlRequired;
