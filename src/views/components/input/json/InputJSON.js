import React, { Component } from 'react';
import { object } from 'prop-types';
import dlv from 'dlv';
import { isObject } from '../../../../utils';
import { Input } from '../../../components';

class InputJSON extends Component {
  static defaultProps = {
  }

  static propTypes = {
    value: object,
  }

  state = {
  }

  render() {
    const {
      value,
      ...restProps
    } = this.props;

    return (
      <Input
        {...restProps}
        type="text"
        value={isObject( value ) ? dlv( value, 'unityObject.objectName' ) : null}
      />
    );
  }
}

export default InputJSON;
