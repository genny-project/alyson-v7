import { Component } from 'react';
import { object, node } from 'prop-types';
import dlv from 'dlv';
import { isArray, isObject  } from '../../../../utils';

class StatefulThemeHandler extends Component {
  static propTypes = {
    children: node,
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
    const { children, subcomponentProps } = this.props;

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

    return children({
      themes: {},
      inputProps: getPropsByState(),
      onChangeState: this.handleChangeState,
    });
  }
}

export default StatefulThemeHandler;

