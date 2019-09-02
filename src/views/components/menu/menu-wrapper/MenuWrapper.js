import React, { Component } from 'react';
import { func, bool } from 'prop-types';
import debounce from 'lodash.debounce';
import { isObject } from '../../../../utils';
import MenuProvider from '../provider';

class MenuWrapper extends Component {
  static propTypes = {
    children: func.isRequired,
    disabled: bool,
  }

  constructor( props ) {
    super( props );

    this.inputs = {};
    this.handleBlurDebounced = debounce( this.handleBlurDebounced, 100 );
  }

  state = {
    isOpen: false,
    buttonArea: null,
    isClosing: false,
  }

  componentDidMount() {
    if ( isObject( this.inputs, { withProperty: 'menu-button' })) {
      // console.warn( this.inputs['menu-button'], this.inputs['menu-button'].focus );

      // this.inputs['menu-button'].focus();
    }
  }

  setButtonArea = ( area ) => {
    const offsetArea = { ...area };

    const compareAreaValues = ( currentArea, nextArea ) => {
      if ( !isObject( currentArea ) || !isObject( nextArea )) return true;

      const nextAreaKeys = Object.keys( nextArea );

      const isObjectDiff = nextAreaKeys.some( nextAreaKey => {
        const isKeyMatch = nextArea[nextAreaKey] === currentArea[nextAreaKey];

        return !isKeyMatch;
      });

      return isObjectDiff;
    };

    if (
      compareAreaValues( this.state.buttonArea, offsetArea )
    ) {
      this.setState({
        buttonArea: offsetArea,
      });
    }
  }

  setRef = ( ref, id ) => {
    // console.log( 'setref', ref );
    if ( ref ) {
      this.inputs[id] = ref;
    }

    // console.log( this.inputs );
  }

  handleToggle = () => {
    this.setState( state => ({
      isOpen: !state.isOpen,
    }));
  }

  handleOpen = () => {
    if ( this.props.disabled )
      return;

    this.setState({
      isClosing: false,
      isOpen: true,
    });
  }

  handleClose = () => {
    this.setState({
      isClosing: false,
      isOpen: false,
    });
  }

  handleBlurDebounced = () => {
    if (
      this.state.isClosing &&
      this.state.isOpen
    ) {
      this.handleClose();
    }
  }

  handleContentBlur = () => {
    this.setState({
      isClosing: true,
    });

    this.handleBlurDebounced();
  }

  handleContentFocus = () => {
    this.setState({
      isClosing: false,
    });
  }

  handlePressItem = () => {
    this.handleClose();
  }

  render() {
    const { children } = this.props;
    const { isOpen, buttonArea } = this.state;

    return (
      <MenuProvider
        value={{
          isOpen: isOpen,
          handleToggle: this.handleToggle,
          handleOpen: this.handleOpen,
          handleClose: this.handleClose,
          handleContentBlur: this.handleContentBlur,
          handleContentFocus: this.handleContentFocus,
          handlePressItem: this.handlePressItem,
          setRef: this.setRef,
          setButtonArea: this.setButtonArea,
          buttonArea: buttonArea,
        }}
      >
        {children( this.state )}
      </MenuProvider>
    );
  }
}

export default MenuWrapper;
