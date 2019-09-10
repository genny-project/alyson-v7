import { Component } from 'react';
import { array, node, func, bool, string } from 'prop-types';
import { isObject  } from '../../../../utils';

class StatefulThemeHandler extends Component {
  static propTypes = {
    children: node,
    subcomponentTypes: array,
//    onChangeState: func,
    getStyling: func,
    getIcon: func,
    editable: bool,
    disabled: bool,
    error: string,
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
      children,
      subcomponentTypes,
      getStyling,
      getIcon,
      editable,
      disabled,
      error,
    } = this.props;

    const getSubcomponentPropsByType = ( type ) => {
      const typeThemes = getStyling( type );

      const getObjectFromKey = ( key, options = {}) => {
        const themeProps = isObject( typeThemes, { withProperty: key }) &&
        ( !isObject( options, { withProperty: 'condition' }) || options.condition )
          ? isObject( options, { withProperty: 'returnWithKey' })
            ? { [key]: typeThemes[key] }
            : typeThemes[key]
          : {};

        return themeProps;
      };

      const icon = getIcon ? getIcon() : null;

      return {
        // ,
        ...getObjectFromKey( 'default', { returnWithKey: true }),
        ...getObjectFromKey( 'hover', { returnWithKey: true }),
        ...getObjectFromKey( 'active', { returnWithKey: true }),
        ...getObjectFromKey( 'selected', { returnWithKey: true }),
        ...getObjectFromKey( 'disabled', { returnWithKey: true, condition: editable === false || disabled }),
        ...getObjectFromKey( 'error', { returnWithKey: true, condition: error }),
        ...getObjectFromKey( 'readonly', { returnWithKey: true }),
        ...icon ? { icon } : {},
      };
    };

    const {
      hover,
      active,
    } = this.state;

    const subcomponentThemes = {};

    subcomponentTypes.forEach( subcomponent => {
      subcomponentThemes[subcomponent] = getSubcomponentPropsByType( subcomponent );
    });

    const getProps = () => {
      if ( !isObject( subcomponentThemes )) return {};

      const inputProps = subcomponentThemes['input-field'];

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
      subcomponentProps: subcomponentThemes,
      inputProps: getProps(),
      onChangeState: this.handleChangeState,
    });
  }
}

export default StatefulThemeHandler;

