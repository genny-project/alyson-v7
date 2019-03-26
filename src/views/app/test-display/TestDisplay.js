import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';
import { Text, Box } from '../../components';

class TestDisplay extends Component {
  static defaultProps = {
    testDisplay: {},
  }

  static propTypes = {
    testDisplay: object,
  }

  render() {
    const { testDisplay } = this.props;

    return (
      <Box
        width="100%"
        height={50}
        padding={2}
      >
        <Text
          size="xxs"
          text="Current Element ID:"
        />

        <Text
          size="xxs"
          text={testDisplay.testId}
        />
      </Box>
    );
  }
}

export { TestDisplay };

const mapStateToProps = state => ({
  testDisplay: state.testDisplay,
});

export default connect( mapStateToProps )( TestDisplay );
