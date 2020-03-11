import React, { Component } from 'react';
import { string } from 'prop-types';
// import { string, object, bool, number, func } from 'prop-types';
// import { isArray } from '../../../../../../utils';
import { Box, Icon } from '../../../../components';
import Tooltip from '../../../../components/tooltip';

class VisualControlHint extends Component {
  static propTypes = {
    questionCode: string,
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
        <Tooltip text={`${this.props.questionCode}`}>
          <Icon
            name="help"
            size="xs"
            color="grey"
            cursor="help"
            {...restProps}
          />
        </Tooltip>
      </Box>
    );
  }
}

export default VisualControlHint;
