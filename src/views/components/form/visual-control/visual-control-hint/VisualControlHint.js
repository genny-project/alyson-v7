import React, { Component } from 'react';
import { string, object } from 'prop-types';
// import { string, object, bool, number, func } from 'prop-types';
// import { isArray } from '../../../../../../utils';
import { Icon, Tooltip, Text, Box } from '../../../../components';

class VisualControlHint extends Component {
  static propTypes = {
    questionCode: string,
    iconProps: object,
    textProps: object,
    subcomponentProps: object,
    description: object,
  }

  render() {
    const {
      iconProps,
      textProps,
      description,
      ...restProps
    } = this.props;

    return (

      <Tooltip
        renderHeader={(
          <Box
            marginLeft="auto"
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
        {...restProps}
      >
        <Text
          text={description}
          {...textProps}
        />

      </Tooltip>
    );
  }
}

export default VisualControlHint;
