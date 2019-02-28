import React, { Component } from 'react';
import { string, object, number } from 'prop-types';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { isArray, isObject, isString } from '../../../../utils';
import { Box, Collapsible } from '../../index';
import FormInput from '../input';

const defaultStyle = {
  group: {
    flexDirection: 'column',
    position: 'relative',
    flex: 1,
  },
};

class FormGroup extends Component {
  static propTypes = {
    rootCode: string,
    questionGroup: object,
    form: object,
    inheritedThemes: object,
    index: number,
    dataTypes: object,
    functions: object,
    inputRefs: object,
    themes: object,
    asks: object,
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
    console.log( '================================' );
    console.log( 'checkThemes', this.props );
    const { questionGroup, asks } = this.props;
    const { questionCode } = questionGroup;

    console.log( asks, questionGroup, questionCode );
    if ( !asks || !asks[questionCode] ) {
      return null;
    }

    const askData = asks[questionCode];

    console.log( askData );

    const getLinkedThemes = () => {
      return isArray( askData.links, { ofMinLength: 1 })
        ? askData.links.filter( link => {
          if ( this.props.rootCode === 'QUE_PROJECT_USER_OPTIONS_GRP' ) console.log( 'link', link );

          return dlv( this.props, `themes.${link.code}` ) != null;
        })
        : [];
    };

    if ( isObject( askData )) {
      /* Valid links are added to the state key that matches their link type, so check all the state arrays together */
      const oldArray = this.state.themes;
      const newArray = dlv( askData, 'links' );

      if ( this.props.rootCode === 'QUE_PROJECT_USER_OPTIONS_GRP' ) console.log( 'arrays', oldArray, newArray );
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
          /* Ask Bes are being passed to Frame via the baseEntity prop, while frames and themes have their own props
            so we need to check where we are looking for a base entity. If no entity is found that matches the
            target code  of the link, it is not added to the array of new links */
          if ( this.props.rootCode === 'QUE_PROJECT_USER_OPTIONS_GRP' ) console.log( 'item check', this.props.themes, item );
          if ( isObject( dlv( this.props,`themes.${item.code}` )
          )) {
            if ( this.props.rootCode === 'QUE_PROJECT_USER_OPTIONS_GRP' ) console.log( 'item', item );
            newLinks.push( item.code );
          }
        });
      }

      if ( this.props.rootCode === 'QUE_PROJECT_USER_OPTIONS_GRP' ) console.log( 'newlinks', newLinks );

      /* Find the differences between the two sets of links */
      const toAdd = newLinks.filter( item => !prevLinks.includes( item ));
      const toRemove = prevLinks.filter( item => !newLinks.includes( item ));

      // const toChangePanel = [];

      /* For items that have the same target, check if the panel ( linkValue ) is the same*/
      newLinks.filter( newLinkCode => prevLinks.includes( newLinkCode )).forEach( newLinkCode => {
        const oldBe = oldArray.filter( link => link.code === newLinkCode )[0];
        const newBe = newArray.filter( link => link.code === newLinkCode )[0];

        // const isPanelMatch = oldBe.panel ===  newBe.panel;

        // if ( !isPanelMatch ) toChangePanel.push( newLinkCode );
      });

      /* if any changes are found, update */
      if ( this.props.rootCode === 'QUE_PROJECT_USER_OPTIONS_GRP' ) console.log( 'diff', toAdd, toRemove );
      if (
        toAdd.length > 0 ||
        toRemove.length > 0
        // toChangePanel.length > 0
      ) {
        const linkedThemes = getLinkedThemes();

        if ( this.props.rootCode === 'QUE_PROJECT_USER_OPTIONS_GRP' ) console.log( linkedThemes );
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

  renderInput = (
    ask,
    questionGroupCode,
    index,
    form,
    inheritedStyling,
  ) => {
    const {
      dataTypes,
      functions,
      inputRefs,
    } = this.props;

    const {
      values,
      errors,
      touched,
      setFieldValue,
      setFieldTouched,
      isSubmitting,
      submitForm,
      isFormValid,
    } = form;
    const {
      handleChange,
      handleFocusNextInput,
      handleBlur,
      handleKeyPress,
      addRef,
    } = functions;
    const { questionCode, attributeCode, mandatory, question, contextList, readonly } = ask;
    const baseEntityDefinition = dataTypes[attributeCode];
    const dataType = baseEntityDefinition && baseEntityDefinition.dataType;

    const isFormSubmit = isObject( contextList, { withProperty: 'isFormSubmit' }) ? contextList.isFormSubmit : false;

    const inputProps = {
      onChangeValue: handleChange( questionCode, setFieldValue, setFieldTouched, ask ), // functions
      value: values && values[questionCode],
      type: isString( dataType ) ? dataType.toLowerCase() : dataType,
      error: touched[questionCode] && errors[questionCode],
      onBlur: handleBlur( ask, values, errors ), // functions
      required: mandatory,
      question,
      disabled: isFormSubmit
        ? !isFormValid
        : isSubmitting,
      editable: !readonly,
      onSubmitEditing: handleFocusNextInput( questionGroupCode, index ), // functions
      blurOnSubmit: (
        !inputRefs[questionGroupCode] ||
        !inputRefs[questionGroupCode][index + 1] // refs
      ),
      ref: input => addRef( questionGroupCode, index, input ),
      returnKeyType: (
        inputRefs[questionGroupCode] &&
        inputRefs[questionGroupCode][index + 1] // refs
      )
        ? 'next'
        : 'default',
      onKeyPress: handleKeyPress( submitForm, index, questionGroupCode ), // functions
      onPress: () => submitForm(),
      testID: questionCode || '',
      ...contextList,
      rootQuestionGroupCode: this.props.rootCode,
      ...inheritedStyling,
    };

    if ( this.props.rootCode === 'QUE_PROJECT_USER_OPTIONS_GRP' ) console.log( inheritedStyling );

    return (
      <FormInput
        key={questionCode}
        {...inputProps}
      />
    );
  }

  renderQuestionGroup = ( ask, index, form ) => {
    console.log( ask, index, form );

    const getStylingByPanel = ( onlyInheritableThemes ) => {
      let styling = {
        ...isObject( this.props.inheritedThemes ) ? this.props.inheritedThemes : {},
      };

      if ( isArray( this.state.themes )) {
        this.state.themes.forEach( theme => {
          const themeData = dlv(  this.props.themes, `${theme.code}.data` );
          const themeIsInheritable = dlv(  this.props.themes, `${theme.code}.isInheritable` );

          if ( onlyInheritableThemes && !themeIsInheritable ) return;

          styling = {
            ...styling,
            ...( isObject( themeData ) ? themeData : {}),
          };
        });
      }

      return styling;
    };

    const getStylingInheritable = () => {
      return getStylingByPanel( true );
    };

    return (
      React.createElement(
        FormGroup,
        {
          questionGroup: ask,
          form: form,
          rootCode: this.props.rootCode,
          inheritedThemes: getStylingInheritable(),
          index: index,
          dataTypes: this.props.dataTypes,
          functions: this.props.functions,
          inputRefs: this.props.inputRefs,
          asks: this.props.asks,
          themes: this.props.themes,
        },
      )
    );
  }

  render() {
    const { index, inheritedThemes, questionGroup, form, themes } = this.props;
    const {
      name,
      childAsks,
      question,
      questionCode,
      contextList,
    } = questionGroup;

    const isDropdown = isObject( contextList, { withProperty: 'isDropdown' }) ? contextList.isDropdown : false;

    console.log( 'isDropdown', questionCode, isDropdown, contextList, questionGroup );
    if ( this.props.rootCode === 'QUE_PROJECT_USER_OPTIONS_GRP' ) console.log( this.props );

    if ( this.props.rootCode === 'QUE_PROJECT_USER_OPTIONS_GRP' ) console.log( 'RENDER FORM GROUP', questionGroup, questionCode );

    if ( this.props.rootCode === 'QUE_PROJECT_USER_OPTIONS_GRP' ) console.log( this.state.themes, inheritedThemes );

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
        ...defaultStyle.group,
        ...getStylingByPanel(),
      };
    };

    const getStylingInheritable = () => {
      return getStylingByPanel( true );
    };

    if ( isDropdown && question ) {
      return (
        <Collapsible
          renderHeader={
            this.renderInput(
              questionGroup,
              questionCode,
              index,
              form,
              getStylingInheritable(),
            )
          }
          headerIconProps={getStylingInheritable()}
        >
          <Box
            key={name}
            zIndex={150 - index}
            {...inheritedThemes}
            padding={10}
            {...getStyling()}
          >
            {childAsks.map(( childAsk, index ) => {
              if ( isArray( childAsk.childAsks, { ofMinLength: 1 })) {
                console.log( 'childAsk', childAsk );

                return this.renderQuestionGroup(
                  childAsk,
                  index,
                  form
                );
              }

              return this.renderInput(
                childAsk,
                questionCode,
                index,
                form,
                getStylingInheritable(),
              );
            })}
          </Box>
        </Collapsible>
      );
    }

    if ( this.props.rootCode === 'QUE_PROJECT_USER_OPTIONS_GRP' ) console.log({ ...getStyling() });
    if ( this.props.rootCode === 'QUE_PROJECT_USER_OPTIONS_GRP' ) console.log({ ...getStylingInheritable() });

    return (
      <Box
        key={name}
        zIndex={150 - index}
        {...inheritedThemes}
        padding={10}
        {...getStyling()}
      >
        {question
          ? (
            this.renderInput(
              questionGroup,
              questionCode,
              index,
              form,
            )) : null
        }
        {childAsks.map(( ask, index ) => {
          if ( isArray( ask.childAsks, { ofMinLength: 1 })) {
            return this.renderQuestionGroup(
              ask,
              index,
              form
            );
          }

          return this.renderInput(
            ask,
            questionCode,
            index,
            form,
            getStylingInheritable(),
          );
        })}
      </Box>
    );
  }
}

export { FormGroup };

const mapStateToProps = state => ({
  dataTypes: state.vertx.baseEntities.definitions.data,
  themes: state.vertx.layouts.themes,
  asks: state.vertx.layouts.asks,
});

export default connect( mapStateToProps )( FormGroup );
