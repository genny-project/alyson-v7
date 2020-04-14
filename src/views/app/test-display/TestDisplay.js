import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { Text, Box } from '../../components';

class TestDisplay extends Component {
  static propTypes = {
    testId: string,
  }

  render() {
    const { testId } = this.props;

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
          text={testId}
        />
      </Box>
    );
  }
}

export { TestDisplay };

const mapStateToProps = state => ({
  testId: state.session.testId,
});

export default connect( mapStateToProps )( TestDisplay );
