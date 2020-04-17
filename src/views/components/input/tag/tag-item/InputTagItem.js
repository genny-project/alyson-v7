import React, { Component } from 'react';
import { object, string, func, bool } from 'prop-types';
// import { isObject } from '../../../../../utils';
import { Box, Touchable, Text, Icon } from '../../../index';

class InputTagItem extends Component {
  static propTypes = {
    renderProp: object,
    item: object,
    itemString: string,
    touchableProps: object,
    onPress: func,
    editable: bool,
    stateBasedProps: func,
  }

  state = {
    hover: false,
    active: false,
  }

  handleChangeState = ( newState ) => {
    this.setState( state => ({
      ...state,
      ...newState,
    }));
  }

  render() {
    const {
      itemString,
      touchableProps,
      // onPress,
      editable,
      stateBasedProps,
      // ...restProps
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
            {...stateBasedProps({})}
          />
        </Box>

        {editable ? (
          <Touchable
            {...touchableProps}
            onChangeState={this.handleChangeState}
          >
            <Icon
              type="material-icons"
              name="clear"
              size="sm"
              color="black"
              cursor="pointer"
              {...stateBasedProps( this.state )}
            />
          </Touchable>
        ) : null }
      </Box>
    );
  }
}

export default InputTagItem;
