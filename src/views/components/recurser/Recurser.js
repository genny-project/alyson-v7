// /* eslint-disable */

import React, { Component } from 'react';
import { object, array, bool } from 'prop-types';
import { Fragment, Frame, Text, Form, Box } from '../index';
import { SublayoutLegacy } from '../../components-legacy';
import { isArray, sort, arrayAddDelimiter } from '../../../utils';

class Recurser extends Component {
  static propTypes = {
    themes: object,
    content: array,
    isClosed: bool,
  }

  render() {
    const { content, themes, isClosed } = this.props;

    if ( !isArray( content, { ofMinLength: 1 })) {
      return null;
    }

    const delimiterComponent = (
      <Box
        // delimiter props
        padding={2}
        // backgroundColor="red"
      />
    );

    return (
      <Fragment>
        { arrayAddDelimiter(
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

            if ( linkType === 'sublayout' ) {
              return (
                <SublayoutLegacy
                  key={baseEntityCode}
                  layoutName={baseEntityCode}
                  layoutType="pages"
                  identifier="INITIAL"
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
