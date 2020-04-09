import React, { Component } from 'react';
import { node, bool } from 'prop-types';
import { /* Box, */ MenuContent } from '../../../index';

class InputTagSuggestionContainer extends Component {
  static propTypes = {
    children: node,
    isOpen: bool,
  }

  render() {
    const { children, isOpen, ...restProps } = this.props;

    if ( !isOpen ) return null;

    return (
      <MenuContent
        ref={input => this.input = input}
        backgroundColor="white"
        overflow="auto"
        open
        {...restProps}
      >
        {children}
      </MenuContent>
    );
  }
}

export default InputTagSuggestionContainer;
