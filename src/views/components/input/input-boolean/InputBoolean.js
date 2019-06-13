import React from 'react';
import { oneOf, func } from 'prop-types';
import { Box, object } from '../../index';
import BaseCheckBox from '../base-checkbox/';

class InputCheckBoxNewNew extends React.Component {
  static defaultProps = {
    value: null,
    question: {},
    // question.name,
  };

  static propTypes = {
    value: oneOf( true, false, null ),
    question: object,
    onChangeValue: func,
  };

  state = {
    value: this.props.value, // value is the incoming lists of SELS
    question: this.props.question,
  };

  componentDidUpdate( prevProps ) {
    if ( this.props.value !== prevProps.value || this.props.question !== prevProps.question ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        value: this.props.value,
        question: this.props.question,
      });
    }
  }

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
        if ( this.props.onChangeValue ) this.props.onChangeValue( this.state.value );
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
          label={question.name}
        />
      </Box>
    );
  }
}

export default InputCheckBoxNewNew;
