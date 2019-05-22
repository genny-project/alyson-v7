import React, { Component, Fragment } from 'react';
import { string, number, bool, oneOf, object, array, func } from 'prop-types';
import { Box, Text, Icon, Touchable } from '../../index';

class BaseCheckBox extends Component {
  static defaultProps = {};

  static propTypes = {
    label: string,
    onPress: func,
  };

  render() {
    const { label } = this.props;

    return (
      <Fragment>
        <Touchable
          withFeedback
          onPress={this.props.onPress}
        >
          <Box width="30px">
            <Icon
              name={this.props.iconName} // eslint-disable-line
              color="black"
              size="md"
              id={this.props.ID} // eslint-disable-line
            />
          </Box>
          <Text
            text={label}
            whiteSpace="normal"
          />
        </Touchable>
      </Fragment>
    );
  }
}

export default BaseCheckBox;
