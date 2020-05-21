import React, { Component } from 'react';
import { string, oneOf, object, func } from 'prop-types';
import { Box, Text, Icon, Touchable } from '../../index';

// Base check box

class BaseCheckBox extends Component {
  static defaultProps = {
    icons: {
      true: 'check_box',
      false: 'check_box_outline_blank',
      null: 'indeterminate_check_box',
    },
  };

  static propTypes = {
    // Values expected from the parent component
    checkBoxStatus: oneOf( [true, false, null] ).isRequired,
  };

  static propTypes = {
    label: string,
    onPress: func,
    icons: object,
    stateBasedProps: object,
    id: string,
  };

  state = {
    currentIcon: 'indeterminate_check_box',
  };

  componentDidMount() {
    this.setState({
      currentIcon: this.handleIcons( this.props.checkBoxStatus ),
    });
  }

  componentDidUpdate( prevProps ) {
    if ( this.props.checkBoxStatus !== prevProps.checkBoxStatus ) {
      // eslint-disable-next-line
      this.setState({
        currentIcon: this.handleIcons( this.props.checkBoxStatus ),
      });
    }
  }

  handleIcons = () => {
    const { checkBoxStatus, icons } = this.props;

    if ( checkBoxStatus === true ) return icons.true;
    if ( checkBoxStatus === false ) return icons.false;
    if ( checkBoxStatus === null ) return icons.null;
  };

  render() {
    const { label } = this.props;

    return (
      <Touchable
        withFeedback
        onPress={this.props.onPress}
      >
        <Box
          alignItems="center"
          {...this.props.stateBasedProps}
        >
          <Icon
            name={this.state.currentIcon}
            color="black"
            size="md"
            id={this.props.id}
            {...this.props.stateBasedProps}
          />
          <Box
            padding={2}
          />
          <Text
            text={label}
            whiteSpace="normal"
            {...this.props.stateBasedProps}
          />
        </Box>
      </Touchable>
    );
  }
}

export default BaseCheckBox;
