import React, { Component } from 'react';
import { array, string, oneOfType, number } from 'prop-types';
// import { isArray } from '../../../../utils';
import { Image, Box } from '../../index';

class InputImage extends Component {
  static defaultProps = {
    height: '100%',
    width: '100%',
  }

  static propTypes = {
    items: array.isRequired,
    color: string,
    rootQuestionGroupCode: string,
    height: oneOfType(
      [string, number]
    ),
    width: oneOfType(
      [string, number]
    ),
    value: string,
  }

  state = {
    isEditing: false,
  }

  handleToggle = () => {
    this.setState( state => ({
      isEditing: !state.isEditing,
    }));
  }

  render() {
    const {
      value,
      height,
      width,
      ...restProps
    } = this.props;
    const { isEditing } = this.state; // eslint-disable-line no-unused-vars

    return (
      <Box
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          height={height}
          width={width}
        >
          <Image
            {...restProps}
            source={value || ''}
          />
          {/* <Touchable
            withFeedback
            onPress={this.handleToggle}
          >
            <Text
              text={isEditing ? 'Close' : 'Edit'}
            />
          </Touchable>
          {
            isEditing
              ? (
                <Input
                  {...this.props}
                  type="file"
                  imageOnly
                  ref={input => this.input = input}
                />
              )
              : (
                <Image
                  source={value || ''}
                />
              )
          } */}
        </Box>
      </Box>
    );
  }
}

export default InputImage;
