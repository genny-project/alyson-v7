import React from 'react';
import { array, func, string, bool, number, oneOf } from 'prop-types';
import { Box, Text, Icon, Touchable, object } from '../../index';
import { isArray } from '../../../../utils';

const question = {
  text: 'Hello World',
};

const value = null;

class InputCheckBoxNewNew extends React.Component {
  static defaultProps = {
    value: null,
    initialIcon: 'check_box_outline_blank',
    nullValueIcon: 'indeterminate_check_box',
    modifiedIcon: 'check_box',
    numberOfColumns: 1,
    question: question,
    // question.name,
  };

  static propTypes = {
    value: oneOf( true, false, null ),
    onChangeValue: func,
    initialIcon: string,
    modifiedIcon: string,
    nullValueIcon: string,
    numberOfColumns: number,
    question: object,
  };

  state = {
    value: this.props.value, // value is the incoming lists of SELS
    question: this.props.question,
  };

  handleChange = () => {
    console.warn( this.state.value === null );

    this.setState(
      state => {
        if ( state.value === null ) return { value: true };
        if ( state.value === true ) return { value: false };
        if ( state.value === false ) return { value: null };

        return { value: null };
      },
      () => {
        console.warn( this.state.value );
      }
    );
  };

  render() {
    const { value, question } = this.state;
    const { initialIcon, modifiedIcon, numberOfColumns, nullValueIcon } = this.props;

    const chooseIcon = input => {
      const choice = {
        true: modifiedIcon,
        false: initialIcon,
        null: nullValueIcon,
        undefined: nullValueIcon,
      };

      return choice[input] || choice.null;
    };

    return (
      <Box
        flexDirection="row"
        flexWrap="wrap"
      >
        <Box width={`${100 / numberOfColumns}%`}>
          <Touchable
            withFeedback
            onPress={this.handleChange}
          >
            <Box width="30px">
              <Icon
                name={chooseIcon( this.state.value )}
                color="black"
                size="md"
                id={question.text}
              />
            </Box>
          </Touchable>
          <Touchable
            withFeedback
            onPress={this.handleChange}
          >
            <Text
              text={question.text ? question.text : 'Text not available'}
              whiteSpace="normal"
            />
          </Touchable>
        </Box>
      </Box>
    );
  }
}

export default InputCheckBoxNewNew;
