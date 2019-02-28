import React, { Component } from 'react';
import { node, string, any, object, number } from 'prop-types';
// import debounce from 'lodash.debounce';
import { Box } from '../../index';
// import FormInputDropdown from './dropdown';
// import FormInputCheckbox from './checkbox';

class FormGroup extends Component {
  static propTypes = {
    children: node,
    code: string,
    renderQuestionForGroup: any,
    inheritedThemes: object,
    index: number,
    name: string,
  }

  render() {
    const { children, code, renderQuestionForGroup, index, name, inheritedThemes } = this.props;

    console.log( 'RENDER FORM GROUP', code );

    console.log( inheritedThemes );

    return (
      <Box
        flexDirection="column"
        zIndex={150 - index}
        position="relative"
        flex={1}
        key={name}
        // backgroundColor="rgba(255, 0, 0, 0.1)"
        // paddingLeft={5}
        {...inheritedThemes}
      >
        {renderQuestionForGroup}
        {children}
      </Box>
    );
  }
}

export default FormGroup;
