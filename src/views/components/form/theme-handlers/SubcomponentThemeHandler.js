import { Component } from 'react';
import { string, bool, node, object } from 'prop-types';
import { isObject, isString  } from '../../../../utils';

class SubcomponentThemeHandler extends Component {
  static propTypes = {
    children: node,
    // onChangeState: func,
    subcomponentProps: object,
    editable: bool,
    disabled: bool,
    error: string,
  }

  state = {
    subcomponents: {},
  }

  updateState = ( subcomponent ) => ( newState ) => {
    this.setState( state => ({
      subcomponents: {
        ...state.subcomponents,
        [subcomponent]: {
          ...state.subcomponents[subcomponent],
          ...newState,
        },
      },
    }));
  }

  render() {
    const { children, subcomponentProps, editable, disabled, error } = this.props;
    const { subcomponents } = this.state;
    // integrate state
    const getPropsByType = ( type, conditions ) => {
      if ( !isObject( subcomponentProps )) return {};

      const typeThemes = subcomponentProps[type];

      const getObjectFromKey = ( key, options = {}) => {
        const themeProps = isObject( typeThemes, { withProperty: key }) &&
        (
          isObject( conditions, { withProperty: key })
            ? conditions[key]
            : (
              !isObject( options, { withProperty: 'condition' }) ||
              options.condition
            )
        ) ? isObject( options, { withProperty: 'returnWithKey' })
            ? { [key]: typeThemes[key] }
            : typeThemes[key]
          : {};

        return themeProps;
      };

      return {
        ...getObjectFromKey( 'default' ),
        ...getObjectFromKey( 'hover', { condition: subcomponents[type] && subcomponents[type].hover }),
        ...getObjectFromKey( 'active', { condition: subcomponents[type] && subcomponents[type].active }),
        ...getObjectFromKey( 'selected', { condition: subcomponents[type] && subcomponents[type].selected }),
        ...getObjectFromKey( 'disabled', { condition: editable === false || disabled }),
        ...getObjectFromKey( 'error', { condition: error }),
      };
    };

    const componentProps = {};

    if ( isObject( subcomponentProps )) {
      Object.keys( subcomponentProps ).forEach( type => {
        if ( isString( type )) {
          componentProps[type] = getPropsByType( type );
        }
      });
    }

    const filterComponentProps = ( type, conditions ) => {
      const filteredProps = getPropsByType( type, conditions );

      return filteredProps;
    };

    return children({
      componentProps,
      updateState: this.updateState,
      filterComponentProps: filterComponentProps,
    });
  }
}

export default SubcomponentThemeHandler;
