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
        maxHeight="50vh"
        overflow="auto"
        {...restProps}
      >
        {/* <Box
          flexDirection="column"
          position="absolute"
          backgroundColor="white"
          top={30}
          left={0}
          width="100%"
          zIndex={100}
          // borderWidth={2}
          // borderStyle="solid"
          // borderColor="#DDD"
          cleanStyleObject
          maxHeight="11rem"
          overflow="auto"
          shadowColor="#000"
          shadowOpacity={0.4}
          shadowRadius={5}
          shadowOffset={{
            width: 0,
            height: 0,
          }}
          {...restProps}
        > */}
        {children}
        {/* </Box> */}
      </MenuContent>
    );
  }
}

export default InputTagSuggestionContainer;
