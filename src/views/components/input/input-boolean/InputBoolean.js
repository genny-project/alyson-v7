import React from 'react';
import { oneOf } from 'prop-types';
import { Box, object } from '../../index';
import BaseCheckBox from '../base-checkbox/';

const question = {
  text: 'Hello World new ',
};

class InputCheckBoxNewNew extends React.Component {
  static defaultProps = {
    value: null,
    question: question,
    // question.name,
  };

  static propTypes = {
    value: oneOf( true, false, null ),
    question: object,
  };

  state = {
    value: this.props.value, // value is the incoming lists of SELS
    question: this.props.question,
  };

  handleChange = () => {
    console.warn('handle chagne in inp bool'); //eslint-disable-line
    this.setState(
      state => {
        if ( state.value === null ) return { value: true };
        if ( state.value === true ) return { value: false };
        if ( state.value === false ) return { value: null };

        return { value: null };
      },
      () => {
        console.warn( this.state, 'state from input boolean' ); // eslint console warn
      }
    );
  };

  render() {
    const { value, question } = this.state;

    return (
      <Box
        flexDirection="row"
        flexWrap="wrap"
      >
        <BaseCheckBox
          onPress={this.handleChange}
          checkBoxStatus={value}
          iconName={value}
          ID={question.text}
          label={question.text}
        />
      </Box>
    );
  }
}

export default InputCheckBoxNewNew;
