import React, { Component } from 'react';
import { string, object, bool, number, func } from 'prop-types';
// import { isArray } from '../../../../../../utils';
import { Box, Text, Icon, Touchable } from '../../../../components';

class VisualControlDescription extends Component {
  static propTypes = {
  }

  render() {
    const {
      ...restProps
    } = this.props;

    return (
      <Box
        paddingBottom={5}
        {...restProps}
      >
        <Text
          size="xxs"
          text="Description text goes here"
          {...restProps}
        />
      </Box>
    );
  }
}

export default VisualControlDescription;
