import { Component } from 'react';
import { string, bool, func, array } from 'prop-types';
import { isObject, isString  } from '../../../../utils';

class StatelessThemeHandler extends Component {
  static propTypes = {
    children: func,
    getStyling: func,
    getIcon: func,
    componentTypes: array,
    editable: bool,
    disabled: bool,
    error: string,
  }

  render() {
    const { children, componentTypes, editable, disabled, error, getIcon, getStyling } = this.props;

    const getPropsByType = ( type ) => {
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

      return {
        ...getObjectFromKey( 'default' ),
        ...getObjectFromKey( 'disabled', { condition: editable === false || disabled }),
        ...getObjectFromKey( 'error', { condition: error }),
        icon: getIcon && getIcon(),
      };
    };

    const componentProps = {};

    componentTypes.forEach( type => {
      if ( isString( type )) {
        componentProps[type] = getPropsByType( type );
      }
    });

    return children({
      componentProps,
    });
  }
}

export default StatelessThemeHandler;

