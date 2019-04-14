import React, { Component } from 'react';
import { string, oneOfType, number, bool, object } from 'prop-types';
import { Bridge } from '../../../../utils';
import { Box, Touchable, Icon, Text } from '../../index';

const sortOptions = {
  0: {
    label: 'No Sort',
    icon: 'menu',
    value: 'none',
  },
  1: {
    label: 'Ascending',
    icon: 'sort',
    value: 'asc',
  },
  2: {
    label: 'Descending',
    icon: 'sort',
    value: 'desc',
  },
};

class InputSort extends Component {
  static defaultProps = {
    height: '100%',
    width: '100%',
  }

  static propTypes = {
    color: string,
    rootQuestionGroupCode: string,
    height: oneOfType(
      [string, number]
    ),
    width: oneOfType(
      [string, number]
    ),
    value: string,
    editable: bool,
    isClosed: bool,
    question: object,
    parentGroupCode: string,
    useQuestionNameAsValue: bool,
  }

  state = {
    sortMethod: 0,
  }

  handleToggleSort = () => {
    this.setState( state => ({
      sortMethod: state.sortMethod < Object.keys( sortOptions ).length - 1
        ? state.sortMethod + 1
        : 0,
    }), () => {
      const item = {
        code: this.props.question.code,
        parentCode: this.props.parentGroupCode,
        rootCode: this.props.rootQuestionGroupCode,
        eventType: 'BTN_CLICK',
        messageType: 'BTN',
      };

      if (
        item.code &&
        item.parentCode
      ) {
        Bridge.sendFormattedEvent(
          item
        );
      }
    });
  }

  render() {
    const {
      value,
      // editable,
      color,
      useQuestionNameAsValue,
      question,
      // ...restProps
    } = this.props;
    const { sortMethod } = this.state;

    // console.log( this.props );

    return (
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        <Touchable
          withFeedback
          onPress={this.handleToggleSort}
        >
          <Text
            text={useQuestionNameAsValue ? question.name : value}
          />
          <Box
            {...sortOptions[sortMethod].label === 'Ascending' ? { transform: 'scale(1, -1)' } : {}}
          >
            <Icon
              name={sortOptions[sortMethod].icon}
              size="sm"
              color={color}
            />
          </Box>
        </Touchable>
      </Box>
    );
  }
}

export default InputSort;
