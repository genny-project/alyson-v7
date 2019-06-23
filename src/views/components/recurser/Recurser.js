// /* eslint-disable */

import React, { Component } from 'react';
import { object, array, bool } from 'prop-types';
import { Fragment, Frame, Text, Form, Box } from '../index';
import { isArray, sort /* arrayAddDelimiter */ } from '../../../utils';

class Recurser extends Component {
  static defaultProps = {
    delimiterProps: {},
  };

  static propTypes = {
    themes: object,
    content: array,
    isClosed: bool,
    delimiterProps: object,
    hasDelimiter: bool,
  };

  render() {
    const { content, themes, delimiterProps, /* hasDelimiter,*/ isClosed } = this.props;

    if ( !isArray( content, { ofMinLength: 1 })) {
      return null;
    }

    const delimiterComponent = (
      <Box
        // delimiter props
        padding={5}
        {...delimiterProps['default']}
      />
    );

    const delimiterHandler = array => {
      return /* hasDelimiter ? arrayAddDelimiter( array, delimiterComponent ) : */ array;
    };

    return (
      <Fragment>
        {delimiterHandler(
          sort( content, { paths: ['weight', 'created'], direction: 'desc' }).map( child => {
            const baseEntityCode = child.code;
            const linkType = child.type;

            if ( linkType === 'ask' ) {
              return (
                <Form
                  inheritedProps={themes}
                  key={baseEntityCode}
                  questionGroupCode={baseEntityCode}
                  isClosed={isClosed}
                />
              );
            }

            if ( linkType === 'frame' ) {
              return (
                <Frame
                  key={baseEntityCode}
                  rootCode={baseEntityCode}
                  inheritedProps={themes}
                  isClosed={isClosed}
                />
              );
            }

            return (
              <Text
                {...themes}
                key={baseEntityCode}
                text={baseEntityCode}
              />
            );
          }),
          delimiterComponent
        )}
      </Fragment>
    );
  }
}

export default Recurser;
