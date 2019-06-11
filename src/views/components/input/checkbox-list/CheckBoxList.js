import React from 'react';
import { array, bool, number, object } from 'prop-types';
import { Box, Text, Debug } from '../../index';
import { isArray } from '../../../../utils';
import BaseCheckBox from '../base-checkbox';

const mockData = [
  { value: 'adadada', label: 'adad' },
  { value: 'adadada2', label: 'ada1d' },
  { value: 'adad2ada2', label: 'ada21d' },
];

class CheckBoxList extends React.Component {
  static defaultProps = {
    items: mockData,
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
    data: [],
    selectedItems: 0,
  };

  componentDidMount() {
    // Items Props
    console.warn( this.props.items, 'ITEMS PROPS' );
    console.warn( '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' );

    console.warn( this.props.items, 'items' );
    console.warn( this.props.value, 'values' );
    const data = this.constructInitialValues();
    const noSelectedItems = this.setNumberOFSelectedItemsAtStart();

    console.warn({ noSelectedItems });

    this.setState({
      data,
      noOfSelectedItems: noSelectedItems,
    });
  }

  // Component Did update
  componentDidUpdate( prevProps ) {
    if ( this.props.items !== prevProps.items ) {
      const data = this.constructInitialValues();
      const noSelectedItems = this.setNumberOFSelectedItemsAtStart();
      // eslint-disable-next-line
      this.setState({
        data,
        noOfSelectedItems: noSelectedItems,
      });
    }
  }

  // this method returns number of selected items of the value
  setNumberOFSelectedItemsAtStart() {
    const data = this.constructInitialValues();

    let count = 0;

    data.forEach( v => v.checkBoxStatus === true && count++ );

    return count;
  }

  // This will add an extra field called checkbox status
  // It checks whether the passed items are a part of initial values
  constructInitialValues() {
    const { items, value } = this.props;

    if ( isArray( items, { ofMinLength: 1 })) {
      const newValues = items.map( val => ({
        ...val,
        checkBoxStatus: value.includes( val.value ) ? true : false,
      }));

      return newValues;
    }

    return [];
  }

  handlePress = value => () => {
    const { multiSelect } = this.props;

    let dataToModify;

    if ( multiSelect === true ) {
      console.warn( 'TRUE' );
      dataToModify = this.state.data.find( item => value === item.value );

      console.warn({ dataToModify });

      const modifiedBoolean = !dataToModify.checkBoxStatus;

      dataToModify.checkBoxStatus = modifiedBoolean;

      console.warn({ dataToModify }, 'modified' );

      this.setState(
        state => {
          if ( multiSelect === true ) {
            return { data: [...state.data, ...dataToModify] };
          }

          return { data: state.data };
        },
        () => {
          console.log(this.state); //eslint-disable-line
        }
      );
    }

    if ( multiSelect === false ) {
      dataToModify = this.state.data.find( item => value === item.value );
      const dd = [...dataToModify];

      console.warn( 'FALSE' );

      console.warn({ dataToModify });

      const modifiedBoolean = !dd.checkBoxStatus;

      dataToModify.checkBoxStatus = modifiedBoolean;

      this.setState(
        state => {
          // Condition if the value is already checked

          if ( state.selectedItems >= 1 ) {
            return { data: state.data };
          }

          // return the default data
          return { data: state.data, selectedItems: state.selectedItems++ };
        },
        () => {
          console.log(this.state); // eslint-disable-line
        }
      );
    }
  };

  // Select icons depending upon the Check box or Radio Item

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
                checkBoxStatus={item.checkBoxStatus}
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
