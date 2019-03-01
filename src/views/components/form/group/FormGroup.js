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

  getStylingInheritable = () => {
    return this.getStylingByPanel( true );
  }

  getStylingByPanel = ( onlyInheritableThemes ) => {
    let styling = {
      ...isObject( this.props.inheritedThemes ) ? this.props.inheritedThemes : {},
    };

    if ( isArray( this.state.themes )) {
      this.state.themes.forEach( theme => {
        const themeData = dlv( this.props.themes, `${theme.code}.data` );
        const themeIsInheritable = dlv( this.props.themes, `${theme.code}.isInheritable` );

        if ( onlyInheritableThemes && !themeIsInheritable ) return;

        styling = {
          ...styling,
          ...( isObject( themeData ) ? themeData : {}),
        };
      });
    }

    return styling;
  };

  checkThemes = () => {
    const { questionGroup, asks } = this.props;
    const { questionCode } = questionGroup;

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

      /* Find the differences between the two sets of links */
      const toAdd = newLinks.filter( item => !prevLinks.includes( item ));
      const toRemove = prevLinks.filter( item => !newLinks.includes( item ));

      if (
        toAdd.length > 0 ||
        toRemove.length > 0
        // toChangePanel.length > 0
      ) {
        const linkedThemes = getLinkedThemes();

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
      inheritedThemes: this.getStylingInheritable(),
      ask,
    };

    return (
      <FormInput
        key={questionCode}
        {...inputProps}
      />
    );
  }

  renderQuestionGroup = ( ask, index, form ) => {
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
    const { index, inheritedThemes, questionGroup, form } = this.props;
    const {
      name,
      childAsks,
      question,
      questionCode,
      contextList,
    } = questionGroup;

    const isDropdown = isObject( contextList, { withProperty: 'isDropdown' }) ? contextList.isDropdown : false;

    const getStyling = () => {
      return {
        ...defaultStyle.group,
        ...this.getStylingByPanel(),
      };
    };

    if ( isDropdown ) {
      return (
        <Collapsible
          renderHeader={(
            question &&
            isString( question.attributeCode, { startsWith: 'QQQ_QUESTION_GROUP_' })
          ) ? (
              this.renderInput(
                questionGroup,
                questionCode,
                index,
                form,
              )
            ) : null
          }
          headerIconProps={this.getStylingInheritable()}
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
              );
            })}
          </Box>
        </Collapsible>
      );
    }

    return (
      <Box
        key={name}
        zIndex={150 - index}
        {...inheritedThemes}
        padding={10}
        {...getStyling()}
      >
        {
          (
            question &&
            isString( question.attributeCode, { startsWith: 'QQQ_QUESTION_GROUP_' })
          ) ? (
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
