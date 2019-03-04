// /* eslint-disable */

import React, { Component } from 'react';
import { object, array } from 'prop-types';
import { Fragment, Frame, Text, Form } from '../index';
import { SublayoutLegacy } from '../../components-legacy';
import { isArray, sort } from '../../../utils';

class Recurser extends Component {
  static propTypes = {
    themes: object,
    content: array,
  }

  render() {
    const { content, themes } = this.props;

    if ( !isArray( content, { ofMinLength: 1 })) {
      return null;
    }

    return (
      <Fragment>
        { sort( content, { paths: ['weight', 'created'], direction: 'asc' }).map( child => {
          const baseEntityCode = child.code;
          const linkType = child.type;

          if ( linkType === 'ask' ) {
            return (
              <Form
                inheritedThemes={themes}
                key={baseEntityCode}
                questionGroupCode={baseEntityCode}
              />
            );
          }

          if ( linkType === 'frame' ) {
            return (
              <Frame
                key={baseEntityCode}
                rootCode={baseEntityCode}
                inheritedThemes={themes}
              />
            );
          }

          if ( linkType === 'sublayout' ) {
            return (
              <SublayoutLegacy
                key={baseEntityCode}
                layoutName={baseEntityCode}
                getLayoutTypeFromName
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
        })}
      </Fragment>

    );
  }
}

export default Recurser;
