/* eslint-disable max-len */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { func, string } from 'prop-types';
// import { isObject, isArray } from './../../../../utils';
import { DisplayHTML } from '../../../components';

class HtmlEditor extends Component {
  static propTypes = {
    onChangeValue: func,
    // testID: string,
    value: string,
  };

  state = {
    html: null,
  }

  componentDidMount() {
    if ( this.props.value )
      this.settingStateFromHtml( this.props.value );
  }

  componentDidUpdate( prevProps, prevState ) {
    if (
      ((
        prevProps.value !== this.props.value &&
        this.state.value !== this.props.value
      ) ||
        prevState.value !== this.state.value
      )
    ) {
      this.settingStateFromHtml( this.props.value );
    }
  }

  settingStateFromHtml = ( value ) => {
    const text = `${value}`;

    this.setState({
      html: text,
    });

    // if (
    //   isObject( contentHTML, { withProperty: 'contentBlocks' }) &&
    //   isArray( contentHTML.contentBlocks )
    // ) {
    //   this.setState({
    //     html: contentHTML,
    //   });
    // }
  }

  handleBlur() {
    const { html } = this.state;

    this.props.onChangeValue( html );
  }

  render() {
    const { html  } = this.state;

    return (
      <DisplayHTML html={html} />
    );
  }
}

export default HtmlEditor;
