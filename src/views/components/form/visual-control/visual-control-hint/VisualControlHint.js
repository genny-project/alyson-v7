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
      questionCode,
      ...restProps
    } = this.props;

    return (

      <Dropdown
        subcomponentProps={{
          'group-content-wrapper': {
            position: 'right',
            width: '100%',
            bottom: '100%',
            borderRadius: '3px',
            backgroundColor: '#fff',
            padding: '5px',
            marginBottom: '5px',
            color: '#000',
            textAlign: 'center',
            fontSize: '12px',
            flexDirection: 'row',
            offsetY: 4,
          },
        }}
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
          <Text text={questionCode} />
        </Box>
      </Dropdown>
    );
  }
}

export default VisualControlHint;
