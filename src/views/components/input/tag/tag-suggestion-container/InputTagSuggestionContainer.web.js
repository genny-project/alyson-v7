import React, { Component } from 'react';
import { node, bool } from 'prop-types';
import { Box } from '../../../index';

class InputTagBody extends Component {
  static propTypes = {
    children: node,
    isOpen: bool,
  }

  render() {
    const { children, isOpen, ...restProps } = this.props;

    if ( !isOpen ) return null;

    return (
      <Box
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
      >
        {children}
      </Box>
    );
  }
}

export default InputTagBody;
