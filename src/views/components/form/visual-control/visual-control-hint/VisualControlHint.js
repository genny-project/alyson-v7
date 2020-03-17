import React, { Component } from 'react';
import { string, object } from 'prop-types';
// import { string, object, bool, number, func } from 'prop-types';
// import { isArray } from '../../../../../../utils';
import { Box, Icon, Tooltip, Text } from '../../../../components';

class VisualControlHint extends Component {
  static propTypes = {
    questionCode: string,
    iconProps: object,
  }

  render() {
 //   console.log( 'Props ---->', this.props );
    const {
      questionCode,
      iconProps,
    } = this.props;

    return (

      <Tooltip
        renderHeader={(
          <Box
            paddingLeft={5}
            paddingRight={5}
            cursor="pointer"
            {...iconProps}
          >
            <Icon
              name="help"
              size="xs"
              color="grey"
              cursor="help"
              {...iconProps}
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
