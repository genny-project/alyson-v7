import React, { Component } from 'react';
import { bool, number, func, string } from 'prop-types';
import { Icon, Box, Touchable } from '../../../index';

const styles = {
  default: {
    color: '#ddd',
  },
  selected: {
    color: '#319fd6',
  },

};

class SwipeDot extends Component {
  static defaultProps = {
    icon: 'lens',
    disabled: false,
  };

  static propTypes = {
    active: bool.isRequired,
    selected: bool,
    index: number.isRequired,
    onClick: func.isRequired,
    icon: string,
    disabled: bool,
  };

  handleClick = event => {
    if ( this.props.active && !this.props.disabled ) this.props.onClick( event, this.props.index );
  };

  render() {
    const { active, icon, selected, disabled } = this.props;

    return (
      <Touchable
        withFeedback
        onPress={this.handleClick}
        disabled={disabled}
      >
        <Box
          opacity={active || selected ? 1 : 0}
          padding={5}
        >
          <Icon
            name={icon}
            size="sm"
            {...styles.default}
            {...selected
              ? {
                ...styles.selected,
              } : {}
            }
          />
        </Box>
      </Touchable>
    );
  }
}

export default SwipeDot;
