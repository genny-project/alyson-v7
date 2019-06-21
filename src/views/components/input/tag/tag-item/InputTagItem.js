import React, { Component } from 'react';
import { object, string, func } from 'prop-types';
import { isObject } from '../../../../../utils';
import { Box, Touchable, Text, Icon } from '../../../index';

class InputTagItem extends Component {
  static propTypes = {
    renderProp: object,
    item: object,
    itemString: string,
    touchableProps: object,
    onPress: func,
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
      onPress,
      editable,
      stateBasedProps,
      ...restProps
    } = this.props;

    const { hover, active } = this.state;

    const getPropsByState = () => {
      return {
        ...isObject( stateBasedProps, { withProperty: 'default' }) ? stateBasedProps['default'] : {},
        ...isObject( stateBasedProps, { withProperty: 'hover' }) &&
          hover
          ? stateBasedProps['hover'] : {},
        ...isObject( stateBasedProps, { withProperty: 'active' }) &&
          active
          ? stateBasedProps['active'] : {},
        ...isObject( stateBasedProps, { withProperty: 'disabled' }) &&
          ( this.props.editable === false || this.props.disabled )
          ? stateBasedProps['disabled'] : {},
        ...isObject( stateBasedProps, { withProperty: 'error' }) && this.props.error ? stateBasedProps['error'] : {},
      };
    };

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
            {...getPropsByState()}
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
              {...getPropsByState()}
            />
          </Touchable>
        ) : null }
      </Box>
    );
  }
}

export default InputTagItem;
