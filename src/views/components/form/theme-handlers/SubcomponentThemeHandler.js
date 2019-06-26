import { Component } from 'react';
import { string, bool, node, func, object } from 'prop-types';
import { isObject, isString  } from '../../../../utils';

class SubcomponentThemeHandler extends Component {
  static propTypes = {
    children: node,
    onChangeState: func,
    subcomponentProps: object,
    editable: bool,
    disabled: bool,
    error: string,
  }

  state = {
    subcomponents: {},
  }

  handleChangeState = ( subcomponent, id ) => ( newState ) => {
    console.log( 'handleChangeState', subcomponent, newState );
    this.setState( state => ({
      subcomponents: {
        ...state.subcomponents,
        [subcomponent]: {
          ...state.subcomponents[subcomponent],
          ...newState,
          // ...( isString( id )
          //   ? {
          //     [id]: {
          //       ...state.subcomponents[subcomponent][id],
          //       ...newState,
          //     },
          //   }
          //   : newState
          // ),
        },
      },
    }));
  }

  render() {
    const { children, subcomponentProps, editable, disabled, error } = this.props;
    const { subcomponents } = this.state;
    // integrate state

    const getPropsByType = ( type ) => {
      const typeThemes = subcomponentProps[type];

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
        ...getObjectFromKey( 'hover', { condition: subcomponents[type] && subcomponents[type].hover }),
        ...getObjectFromKey( 'active', { condition: subcomponents[type] && subcomponents[type].active }),
        ...getObjectFromKey( 'disabled', { condition: editable === false || disabled }),
        ...getObjectFromKey( 'error', { condition: error }),
      };
    };

    const componentProps = {};

    Object.keys( subcomponentProps ).forEach( type => {
      if ( isString( type )) {
        componentProps[type] = getPropsByType( type );
      }
    });

    console.log( 'componentProps', componentProps );

    return children({
      componentProps,
      onChangeState: this.handleChangeState,
    });
  }
}

export default SubcomponentThemeHandler;

