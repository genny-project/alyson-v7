import React, { Component } from 'react';
import { string, object, func } from 'prop-types';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { isObject, getLayoutLinksOfType, checkForNewLayoutLinks, filterThemes } from '../../../../utils';
import { Input } from '../../index';
import FormInputDropdown from './dropdown';
import FormInputCheckbox from './checkbox';

class FormInput extends Component {
  static propTypes = {
    type: string.isRequired,
    question: object,
    onChangeValue: func.isRequired,
    ask: object,
    asks: object,
    inheritedThemes: object,
    themes: object,
  }

  constructor( props ) {
    super( props );

    this.handleChangeDebounced = debounce( this.handleChangeDebounced, 300 );
  }

  state = {
    themes: [],
  }

  /* eslint-disable react/sort-comp */

  componentDidMount() {
    this.getThemes();
  }

  // shouldComponentUpdate( nextProps ) {
  //   /* If rootCode is different, then a different base
  //   entity needs to be rendered inside the frame */
  //   const { ask, asks } = nextProps;
  //   const { questionCode } = ask;

  //   console.log( 'shouldComponentUpdate', questionCode );

  //   console.log( 'check roots' );
  //   if ( !asks || !asks[questionCode] ) {
  //     return false;
  //   }
  //   console.log( 'check ask' );
  //   if ( this.props.ask !== nextProps.ask )
  //     return true;

  //   console.log( 'check links' );
  //   /* Check if any of the links of the root base entity have changed */
  //   if ( isObject( asks[questionCode] )) {
  //     console.log( 'check links', questionCode );
  //     console.log( 'green theme found?', dlv( nextProps, 'themes.THM_COLOR_GREEN' ));
  //     if ( checkForNewLayoutLinks(
  //       /* Valid links are added to the state key that matches their
  //       link type, so check all the state arrays together */

  //       this.state.themes,
  //       dlv( nextProps, `asks.${questionCode}.links` ),
  //       nextProps,
  //     )) {
  //       console.log( 'new themes', questionCode );

  //       return true;
  //     }
  //   }

  //   console.log( 'check inherited' );
  //   /* Check if the inherited themes have changed */
  //   if ( checkForNewInheritedThemes( this.props.inheritedThemes, nextProps.inheritedThemes ))
  //     return true;

  //   console.log( 'no diff' );

  //   return false;
  // }

  componentDidUpdate( nextProps ) {
    if ( isObject( dlv( nextProps, `asks.${nextProps.question.code}` ))) {
      const hasNewLinks = checkForNewLayoutLinks(
        this.state.themes,
        dlv( nextProps, `asks.${nextProps.question.code}.links` ),
        nextProps,
      );

      if ( hasNewLinks ) {
        this.getThemes();
      }
    }
  }

  getThemes = () => {
    const { ask, asks } = this.props;
    const { questionCode } = ask;

    if ( !asks || !asks[questionCode] ) {
      return null;
    }

    const askData = asks[questionCode];

    /* filter each of the links based on their type */
    const linkedThemes = getLayoutLinksOfType( askData.links, this.props, 'theme' );

    /* update the state  */
    this.updateThemes( linkedThemes );
  }

  updateThemes = ( links ) => {
    /* check if the stateKey is valid  */
    this.setState({
      ['themes']: [
        ...links,
      ],
    }, () => {});
  }

  getStyling = ( onlyInheritableThemes ) => {
    return {
      ...this.props.inheritedThemes,
      ...filterThemes(
        this.state.themes,
        this.props.themes,
        { onlyInheritableThemes: onlyInheritableThemes }
      ),
    };
  }

  focus() {
    if (
      this.input &&
      this.input.focus
    ) {
      this.input.focus();
    }
  }

  handleChangeDebounced = ( value, withSend ) => {
    this.props.onChangeValue( value, withSend );
  }

  handleChangeValueWithSend = value => {
    this.props.onChangeValue( value, true );
  }

  handleChangeValueWithSendAndDebounce = value => {
    this.handleChangeDebounced( value, true );
  }

  render() {
    const { type, question } = this.props;

    const inputProps = {
      ...this.props,
      theme: this.getStyling(),
    };

    switch ( type ) {
      case 'termsandconditions':
        return (
          <Input
            {...inputProps}
            html={question.html}
            onChangeValue={this.handleChangeValueWithSend}
            ref={input => this.input = input}
          />
        );

      case 'segmentedcontrol':
      case 'dropdown':
      case 'dropdownmultiple':
      case 'tag':
      case 'menu':
        return (
          <FormInputDropdown
            {...inputProps}
            inhertiableStyling={this.getStyling( true )}
            onChangeValue={this.handleChangeValueWithSendAndDebounce}
            ref={input => this.input = input}
          />
        );

      case 'checkboxmultiple':
        return (
          <FormInputCheckbox
            {...inputProps}
            inhertiableStyling={this.getStyling( true )}
            ref={input => this.input = input}
            onChangeValue={this.handleChangeValueWithSendAndDebounce}
          />
        );

      case 'switch':
      case 'java.lang.boolean':
      case 'payment':
      case 'audioRecord':
      case 'audiorecord':
      case 'date':
      case 'java.time.localdate':
      case 'datetime':
      case 'codeverificationfive':
      case 'codeVerificationFive':
      case 'mobileverification':
      case 'java.time.localdatetime':
      case 'htmlarea':
      case 'rich-text-editor':
        return (
          <Input
            {...inputProps}
            onChangeValue={this.handleChangeValueWithSendAndDebounce}
            ref={input => this.input = input}
          />
        );

      case 'file':
      case 'upload':
      case 'filemultiple':
      case 'uploadmultiple':
      case 'image':
      case 'Image':
      case 'imagemultiple':
      case 'Imagemultiple':
      case 'images':
      case 'signature':
        return (
          <Input
            {...inputProps}
            onChangeValue={this.handleChangeValueWithSend}
            ref={input => this.input = input}
          />
        );

      default:
        return (
          <Input
            {...inputProps}
            ref={input => this.input = input}
          />
        );
    }
  }
}

// export default FormInput;

export { FormInput };

const mapStateToProps = state => ({
  themes: state.vertx.layouts.themes,
  asks: state.vertx.layouts.asks,
});

export default connect( mapStateToProps )( FormInput );
