import React, { Component } from 'react';
import { string, bool } from 'prop-types';
import { isString } from '../../../../../utils';
import { Box, Text } from '../../../../components';

class VisualControlDescription extends Component {
  static propTypes = {
    questionCode: string,
    text: string,
    showRequired: bool,
  }

  render() {
    const {
      questionCode,
      text,
      showRequired,
      ...restProps
    } = this.props;

    return (
      <Box
        // paddingBottom={5}
        componentID="VCL-DESCRIPTION"
        componentCode={questionCode}
        paddingTop={4}
        // paddingLeft={4}
        {...restProps}
      >
        <Text
          size="xxs"
          color="#888"
          text={`
            ${showRequired ? '*Required' : ''}
            ${showRequired && isString( text ) ? '. ' : ''}
            ${isString( text ) ? text : ''}
          `}
          componentID="VCL-DESCRIPTION"
          componentCode={questionCode}
          {...restProps}
        />
      </Box>
    );
  }
}

export default VisualControlDescription;
