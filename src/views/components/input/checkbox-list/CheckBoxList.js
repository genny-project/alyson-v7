import React from 'react';
import { array, bool, number, object, func } from 'prop-types';
import { Box, Text } from '../../index';
import { isArray } from '../../../../utils';
import BaseCheckBox from '../base-checkbox';

class CheckBoxList extends React.Component {
  static defaultProps = {
    items: [],
    value: [],
    multiSelect: true,
    numberOfColumns: 1,
  };

  static propTypes = {
    value: array,
    numberOfColumns: number,
    items: array,
    multiSelect: bool,
    icons: object,
    onChangeValue: func,
  };

  state = {
    data: this.props.items,
    selectedItems: 0,
    selected: this.props.value,
  };

  componentDidUpdate( prevProps ) {
    if ( this.props.items !== prevProps.items ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        data: this.props.items,
      });
    }
  }

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
          return { selected: value };
        }

        return { selected: [...state.selected, value] };
      },
      () => {
        if ( this.props.onChangeValue ) this.props.onChangeValue( this.state.selected );

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
      </Box>
    );
  }
}

export default CheckBoxList;
