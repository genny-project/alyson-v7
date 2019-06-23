import React, { Component } from 'react';
import { string, oneOf, number, shape, bool, func, oneOfType, object } from 'prop-types';
import dlv from 'dlv';
import { isObject } from '../../../../utils';
import InputText from './InputText';

class InputTextWithStateThemes extends Component {
  static defaultProps = {
  }

  static propTypes = {
    subcomponentProps: object,
  }

  state = {
    active: false,
    hover: false,
  }

  handleChangeState = ( newState ) => {
    this.setState( state => ({
      ...state,
      ...newState,
    }));
  }

  render() {
    const {
      subcomponentProps,
      ...restProps
    } = this.props;

    const {
      hover,
      active,
    } = this.state;

    const getPropsByState = () => {
      console.log( 'getPropsByState', subcomponentProps );

      if ( !isObject( subcomponentProps )) return {};

      const inputProps = subcomponentProps['input-field'];

      return {
        ...isObject( inputProps, { withProperty: 'default' }) ? inputProps['default'] : {},
        ...isObject( inputProps, { withProperty: 'hover' }) &&
          hover
          ? inputProps['hover'] : {},
        ...isObject( inputProps, { withProperty: 'active' }) &&
          active
          ? inputProps['active'] : {},
        ...isObject( inputProps, { withProperty: 'disabled' }) &&
          ( this.props.editable === false || this.props.disabled )
          ? inputProps['disabled'] : {},
        ...isObject( inputProps, { withProperty: 'error' }) && this.props.error ? inputProps['error'] : {},
      };
    };

    return (
      <InputText
        {...restProps}
        {...getPropsByState()}
        onChangeState={this.handleChangeState}
      />
    );
  }
}

export default InputTextWithStateThemes;
