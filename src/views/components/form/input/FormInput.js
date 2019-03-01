import React, { Component } from 'react';
import { string, object, func } from 'prop-types';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { isArray, isObject, isString } from '../../../../utils';
import { Input } from '../../index';
import FormInputDropdown from './dropdown';
import FormInputCheckbox from './checkbox';

class FormInput extends Component {
  static propTypes = {
    type: string.isRequired,
    question: object,
    onChangeValue: func.isRequired,
    ask: object,
  }

  constructor( props ) {
    super( props );

    this.handleChangeDebounced = debounce( this.handleChangeDebounced, 300 );
  }

  state = {
    themes: [],
  }

  componentDidMount() {
    this.checkThemes();
  }

  componentDidUpdate() {
    this.checkThemes();
  }

  checkThemes = () => {
    const { ask, asks } = this.props;
    const { questionCode } = ask;

    if ( !asks || !asks[questionCode] ) {
      return null;
    }

    const askData = asks[questionCode];

    const getLinkedThemes = () => {
      return isArray( askData.links, { ofMinLength: 1 })
        ? askData.links.filter( link => {
          return dlv( this.props, `themes.${link.code}` ) != null;
        })
        : [];
    };

    // console.log( 'askData', askData );
    if ( isObject( askData )) {
      /* Valid links are added to the state key that matches
      their link type, so check all the state arrays together */
      const oldArray = this.state.themes;
      const newArray = dlv( askData, 'links' );

      const prevLinks = [];
      const newLinks = [];

      /* Get just the target codes */
      if ( isArray( oldArray )) {
        oldArray.forEach( item => {
          prevLinks.push( item.code );
        });
      }

      if ( isArray( newArray )) {
        newArray.forEach( item => {
          /* Ask Bes are being passed to Frame via the baseEntity prop, while
          frames and themes have their own props so we need to check where we
          are looking for a base entity. If no entity is found that matches
          the target code of the link, it is not added to the array of new links */
          if ( isObject( dlv( this.props,`themes.${item.code}` )
          )) {
            newLinks.push( item.code );
          }
        });
      }
      // console.log( 'links', prevLinks,  newLinks );
      /* Find the differences between the two sets of links */
      const toAdd = newLinks.filter( item => !prevLinks.includes( item ));
      const toRemove = prevLinks.filter( item => !newLinks.includes( item ));

      if (
        toAdd.length > 0 ||
        toRemove.length > 0
        // toChangePanel.length > 0
      ) {
        const linkedThemes = getLinkedThemes();

        // console.log( 'changes', toAdd,  toRemove );

        this.updateThemes( linkedThemes );
      }
    }
  }

  updateThemes = ( links ) => {
    /* check if the stateKey is valid  */
    this.setState({
      ['themes']: [
        ...links,
      ],
    }, () => {});
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
    const { type, question, inheritedThemes, themes } = this.props;

    const getStylingByPanel = ( onlyInheritableThemes ) => {
      let styling = {
        ...isObject( inheritedThemes ) ? inheritedThemes : {},
      };

      if ( isArray( this.state.themes )) {
        this.state.themes.forEach( theme => {
          const themeData = dlv( themes, `${theme.code}.data` );
          const themeIsInheritable = dlv( themes, `${theme.code}.isInheritable` );

          if ( onlyInheritableThemes && !themeIsInheritable ) return;

          styling = {
            ...styling,
            ...( isObject( themeData ) ? themeData : {}),
          };
        });
      }

      return styling;
    };

    const getStyling = () => {
      return {
        ...getStylingByPanel(),
      };
    };

    const getStylingInheritable = () => {
      return getStylingByPanel( true );
    };

    const inputProps = {
      ...this.props,
      theme: getStyling(),
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
            inhertiableStyling={getStylingInheritable()}
            onChangeValue={this.handleChangeValueWithSendAndDebounce}
            ref={input => this.input = input}
          />
        );

      case 'checkboxmultiple':
        return (
          <FormInputCheckbox
            {...inputProps}
            inhertiableStyling={getStylingInheritable()}
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
