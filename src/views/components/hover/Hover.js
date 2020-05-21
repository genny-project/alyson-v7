import React from 'react';
import { node } from 'prop-types';

export default class Hover extends React.Component {
  static propTypes = {
    children: node.isRequired,
  };

  state = {
    hovering: false,
  }

  handleMouseOver = () => {
    this.setState({
      hovering: true,
    });
  }

  handleMouseOut = () => {
    this.setState({
      hovering: false,
    });
  }

  render() {
    return (
      <div
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {this.props.children( this.state.hovering )}
      </div>
    );
  }
}
