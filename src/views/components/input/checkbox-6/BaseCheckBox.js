import React, { Component, Fragment } from 'react';
import { string, number, bool, oneOf, object, array, func } from 'prop-types';
import { Box, Text, Icon, Touchable } from '../../index';
import { isArray } from '../../../../utils';

class BaseCheckBox extends Component {
  static defaultProps = {
    multiSelect: false,
    icons: {
      null: 'check_box_outline_blank',
      false: 'check_box',
      true: 'indeterminate_check_box',
    },
    value: [],
    triState: true,
  };

  static propTypes = {
    icons: object,
    multiSelect: bool,
    onChangeValue: func,
    value: array,
  };

  state = {
    selected: this.props.value,
    triValue: null,
  };

  chooseIcon = input => {
    const { icons } = this.props;
    const { triState } = this.props;

    console.warn({ triState }); //eslint-disable-line

    if ( triState ) {
      if ( input === true ) {
        console.warn( icons.true );

        return icons.false;
      }
      if ( input === false ) return icons.null;
      if ( input === null ) return icons.true;
    }

    const iconName = !this.state.selected.includes( input ) ? icons.false : icons.true;

    return iconName;
  };

  handlePress = value => () => {
    const { selected } = this.state;
    const { multiSelect, triState } = this.props;

    console.warn(triState, 'Tri state'); // eslint-disable-line

    this.setState(
      state => {
        // if ( triState ) {
        //   console.warn({ value });
        //   if ( value === false ) return { selected: [true] };
        //   if ( value === true ) return { selected: [false] };
        //   if ( value === null ) return { selected: [true] };
        // }
        if ( state.selected.includes( value )) {
          return { selected: state.selected.filter( item => item !== value ) };
        }

        /* Dont allow to select more than one button / icon */
        if ( !multiSelect && selected.length >= 1 ) {
          /* if the selected value is more or equal to 1 dont allow to add the value */
          return { selected: [...state.selected] };
        }

        return { selected: [...state.selected, value] };
      },
      () => {
        if ( this.props.onChangeValue ) {
          // this.props.onChangeValue( this.state.selected );
          // console.warn({ selected }); //eslint-disable-line
        }
        console.warn({ selected }, 'Selected from set state' );
      }
    );
  };

  render() {
    const { items, icons } = this.props;

    console.warn({ icons });

    return (
      <Box>
        {isArray( items, { ofMinLength: 1 })
          ? items.map( item => (
            <Box key={item.value}>
              <Touchable
                withFeedback
                onPress={this.handlePress( item.value )}
              >
                <Box width="30px">
                  <Icon
                      name={this.chooseIcon(item.value)} // eslint-disable-line
                    color="black"
                    size="md"
                  />
                </Box>
                <Text
                  text={item.label}
                  whiteSpace="normal"
                />
              </Touchable>
            </Box>
          ))
          : null}
      </Box>
    );
  }
}

export default BaseCheckBox;
