import React from 'react';
import { array, bool, number, object } from 'prop-types';
import { Box, Text, Debug } from '../../index';
import { isArray } from '../../../../utils';
import BaseCheckBox from '../base-checkbox';

// const mockData = [
//   { value: 'adadada', label: 'adad' },
//   { value: 'adadada2', label: 'ada1d' },
//   { value: 'adad2ada2', label: 'ada21d' },
// ];

class CheckBoxList extends React.Component {
  static defaultProps = {
    items: [],
    value: [],
    multiSelect: false,
    numberOfColumns: 1,
  };

  static propTypes = {
    value: array,
    numberOfColumns: number,
    items: array,
    multiSelect: bool,
    icons: object,
  };

  state = {
    data: this.props.items,
    selectedItems: 0,
    selected: this.props.value,
  };

  handlePress = value => () => {
    const { selected } = this.state;
    const { multiSelect } = this.props;

    this.setState(
      state => {
        if ( state.selected.includes( value )) {
          return { selected: state.selected.filter( item => item !== value ) };
        }

        /* Dont allow to select more than one button/icon */
        if ( !multiSelect && selected.length >= 1 ) {
          /* if the selected value is more or equal to 1 dont allow to add the value */
          return { selected: [...state.selected] };
        }

        return { selected: [...state.selected, value] };
      },
      () => {
        console.warn(this.state); //eslint-disable-line
      }
    );
  };

  render() {
    const { numberOfColumns, icons } = this.props;

    const { data } = this.state;

    return (
      <Box
        flexDirection="row"
        flexWrap="wrap"
      >
        {isArray( data, { ofMinLength: 1 }) ? (
          data.map( item => (
            <Box
              width={`${100 / numberOfColumns}%`}
              key={item.value}
            >
              <BaseCheckBox
                icons={icons}
                onPress={this.handlePress( item.value )}
                key={item.value}
                checkBoxStatus={this.state.selected.includes( item.value ) ? true : false}
                ID={item.value}
                label={item.label}
              />
            </Box>
          ))
        ) : (
          <Text>
No Items to Show
          </Text>
        )}

        <Debug value={this.state} />
      </Box>
    );
  }
}

export default CheckBoxList;
