import React, { Component } from 'react';
import { string } from 'prop-types';
// import { string, object, bool, number, func } from 'prop-types';
// import { isArray } from '../../../../../../utils';
import { Box, Icon, Tooltip, Text } from '../../../../components';

class VisualControlHint extends Component {
  static propTypes = {
    questionCode: string,
  }

  render() {
    const {
      questionCode,
      ...restProps
    } = this.props;

    return (

      <Tooltip
        renderHeader={(
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
          )}
      >
        <Box>
          <Text text={questionCode} />
        </Box>
      </Tooltip>
    );
  }
}

export default VisualControlHint;
