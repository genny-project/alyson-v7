import React, { Component } from 'react';
import { object, string, func } from 'prop-types';
import { Box, Touchable, Text, Icon } from '../../../index';

class InputTagItem extends Component {
  static propTypes = {
    renderProp: object,
    item: object,
    itemString: string,
    touchableProps: object,
    onPress: func,
  }

  render() {
    const {
      itemString,
      touchableProps,
    } = this.props;

    return (
      <Box
        alignItems="center"
        marginRight={5}
        marginBottom={5}
        // borderWidth={2}
        // borderRadius={20}
        // borderColor="grey"
        // paddingLeft={10}
        // paddingRight={5}
        padding={5}
        backgroundColor="#ddd"
        cleanStyleObject
      >
        <Box
          marginRight={5}
        >
          <Text
            color="black"
            size="xs"
            text={itemString}
          />
        </Box>

        <Touchable
          {...touchableProps}
        >
          <Icon
            type="material-icons"
            name="clear"
            size="sm"
            color="black"
            cursor="pointer"
          />
        </Touchable>
      </Box>
    );
  }
}

export default InputTagItem;
