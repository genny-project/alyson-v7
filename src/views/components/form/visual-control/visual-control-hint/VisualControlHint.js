import React, { Component } from 'react';
import { string } from 'prop-types';
// import { string, object, bool, number, func } from 'prop-types';
// import { isArray } from '../../../../../../utils';
import { Box, Icon, Dropdown, Text } from '../../../../components';

class VisualControlHint extends Component {
  static propTypes = {
    questionCode: string,
  }

  render() {
    const {
      ...restProps
    } = this.props;

    return (

      <Dropdown
        subcomponentProps={{}}
        showIcon={false}
        allowHoverEvents
        allowPressEvents={false}
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
          <Text text="Testing" />
        </Box>
      </Dropdown>
    );
  }
}

export default VisualControlHint;
