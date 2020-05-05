import React from 'react';
import { array, bool, number, object, func, string } from 'prop-types';
import { Box, Text } from '../../index';
import { isArray, isString } from '../../../../utils';
import BaseCheckBox from '../base-checkbox';
import { SubcomponentThemeHandler } from '../../form/theme-handlers';

class Starrating extends React.Component {
  static defaultProps = {
    items: [],
    // value: [],
    multiSelect: true,
    numberOfColumns: 5,
  };

  static propTypes = {
    // value: array,
    value: string,
    numberOfColumns: number,
    items: array,
    multiSelect: bool,
    icons: object,
    onChangeValue: func,
    subcomponentProps: object,
    editable: bool,
    disabled: bool,
    error: string,
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
        if (
          !isArray( state.selected ) ||
          !isString( value )
        ) {
          return { selected: [] };
        }

        /* Dont allow to select more than one button/icon */
        if ( !multiSelect && selected.length >= 1 ) {
          /* if the selected value is more or equal to 1 dont allow to add the value */
          return { selected: [value] };
        }

        if ( state.selected.includes( value )) {
          return { selected: state.selected.filter( item => item !== value ) };
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

    const numberOfButtonsToRender = numberOfColumns > 5 ? 5 : numberOfColumns;

    const { data, selected } = this.state;

    return (
      <SubcomponentThemeHandler
        subcomponentProps={this.props.subcomponentProps}
        editable={this.props.editable}
        disabled={this.props.disabled}
        error={this.props.error}
      >
        {({
          filterComponentProps,
        }) => {
          return (
            <Box
              flexDirection="row"
              flexWrap="wrap"
            >
              {isArray( data, { ofMinLength: 1 }) ? (
                data.map( item => (
                  <Box
                    width={`${100 / ( numberOfButtonsToRender * 2 )}%`}
                    key={item.value}
                  >
                    <BaseCheckBox
                      icons={icons}
                      onPress={this.handlePress( item.value )}
                      key={item.value}
                      checkBoxStatus={(
                          isArray( selected ) &&
                          selected.includes( item.value )
                            ? true
                            : false
                      )}
                      id={item.value}
                      stateBasedProps={
                        filterComponentProps( 'input-item', { selected: isArray( selected ) && selected.includes( item.value ) })
                      }
                    />
                  </Box>
                ))
              ) : (
                <Text
                  text="No Items to Show"
                />
              )}
            </Box>
          );
        }
    }
      </SubcomponentThemeHandler>

    );
  }
}

export default Starrating;
