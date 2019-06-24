import React, { Component, Fragment } from 'react';
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
      <Fragment>
        <Touchable
          withFeedback
          onPress={this.props.onPress}
        >
          <Box width="30px">
            <Icon
              name={this.state.currentIcon} // eslint-disable-line
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
