import React from 'react';
import { array, func, string, bool, number } from 'prop-types';
import { Box, Text, Icon, Touchable } from '../../index';
import { isArray } from '../../../../utils';

const mockData = [
  {
    label: 'Dropdo',
    value: 'SEL_DROPDOWN_ITEM_ONE',
  },
  {
    label: 'Dropdown item three   Dropdown item three Dropdown item three Dropdown item three',
    value: 'SEL_DROPDOWN_ITEM_TWO',
  },
  {
    label: 'Dropdown item two',
    value: 'SEL_DROPDOWN_ITEM_THREE',
  },
  {
    label: 'Dropdown item three   Dropdown item three Dropdown item three Dropdown item three',
    value: 'SEL_DROPDOWN_ITEM_FOUR',
  },
  {
    label: 'Dropdown ',
    value: 'SEL_DROPDOWN_ITEM_TWO0',
  },
  {
    label: 'Dropdown iddfada Dropdown item three',
    value: 'SEL_DROPDOWN_ITEM_THREEE',
  },
  {
    label: 'Dropdown',
    value: 'SEL_DROPDOWN_ITEM_FOURF3',
  },
];

class InputCheckBoxNewNew extends React.Component {
  static defaultProps = {
    value: [],
    multiSelect: true,
    initialIcon: 'check_box_outline_blank',
    modifiedIcon: 'check_box',
    numberOfColumns: 1,
  };

  static propTypes = {
    value: array,
    onChangeValue: func,
    multiSelect: bool,
    initialIcon: string,
    modifiedIcon: string,
    numberOfColumns: number,
  };

  state = {
    selected: this.props.value, // value is the incoming lists of SELS
  };

  // this is where theme Goes
  themify() {
    console.log('This is where theme belongs'); // eslint-disable-line
  }

  handleChange = value => () => {
    console.log({ value }); //eslint-disable-line
    const { selected } = this.state;
    const { multiSelect } = this.props;

    // console.log({ selected });
    this.setState(
      state => {
        if ( state.selected.includes( value )) {
          return { selected: state.selected.filter( item => item !== value ) };
        }

        /* Dont allow to select more than one button/icon */
        if ( !multiSelect && selected.length >= 1 ) {
          // if the selected value is more or equal to 1 dont allow to add the value
          return { selected: [...state.selected] };
        }

        return { selected: [...state.selected, value] };
      },
      () => {
        if ( this.props.onChangeValue ) {
          this.props.onChangeValue( this.state.selected );
        }
      }
    );
  };

  renderIcons() {
    console.warn('Render Icons'); //eslint-disable-line
  }

  // select icons depending upon the Check box or Radio Item

  render() {
    const { selected } = this.state;
    const { modifiedIcon, initialIcon, numberOfColumns } = this.props;

    return (
      <Box
        flexDirection="row"
        flexWrap="wrap"
      >
        {isArray( mockData, { ofMinLength: 1 }) ? (
          mockData.map( item => (
            <Box
              width={`${100 / numberOfColumns}%`}
              key={item.value}
            >
              <Touchable
                withFeedback
                onPress={this.handleChange( item.value )}
              >
                <Box width="30px">
                  <Icon
                    name={!selected.includes( item.value ) ? initialIcon : modifiedIcon}
                    color="black"
                    size="md"
                    id={item.value}
                  />
                </Box>
              </Touchable>

              <Touchable
                withFeedback
                onPress={this.handleChange( item.value )}
              >
                <Text
                  text={item.label}
                  whiteSpace="normal"
                />
              </Touchable>
            </Box>
          ))
        ) : (
          <Text>
            {' '}
No Items to Show
            {' '}
          </Text>
        )}
      </Box>
    );
  }
}

export default InputCheckBoxNewNew;
