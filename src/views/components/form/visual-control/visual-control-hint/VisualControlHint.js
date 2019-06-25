import React, { Component } from 'react';
import { string, object, bool, number, func } from 'prop-types';
// import { isArray } from '../../../../../../utils';
import { Box, Text, Icon, Touchable } from '../../../../components';

class VisualControlHint extends Component {
  static propTypes = {
  }

  render() {
    const {
      ...restProps
    } = this.props;

    return (
      <Box
        paddingLeft={5}
        paddingRight={5}
        cursor="pointer"
        {...restProps}
      >
        <Icon
          name="help"
          size="xs"
          color="grey"
          cursor="help"
          {...restProps}
        />
      </Box>
    );
  }
}

export default VisualControlHint;
