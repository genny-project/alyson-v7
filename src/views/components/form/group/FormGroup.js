import React, { Component } from 'react';
import { string, object, number, bool } from 'prop-types';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { isArray, isObject, isString, getLayoutLinksOfType, checkForNewLayoutLinks, filterThemes, sort, getPropsFromThemes } from '../../../../utils';
import { Box, Collapsible, EventTouchable } from '../../index';
import VisualControl from '../visual-control';

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
    parentGroupCode: string,
    questionGroup: object,
    form: object,
    inheritedThemes: object,
    inheritedProps: object,
    index: number,
    dataTypes: object,
    functions: object,
    inputRefs: object,
    themes: object,
    asks: object,
    isClosed: bool,
  }

  state = {
    themes: [],
  }

  /* eslint-disable react/sort-comp */

  componentDidMount() {
    this.getThemes();
  }

  componentDidUpdate( nextProps ) {
    if (  isObject( dlv( nextProps, `asks.${nextProps.questionGroup.questionCode}` ))) {
      if ( checkForNewLayoutLinks(
        /* Valid links are added to the state key that matches their
        link type, so check all the state arrays together */

        this.state.themes,
        dlv( nextProps, `asks.${nextProps.questionGroup.questionCode}.links` ),
        nextProps,
      )) {
        this.getThemes();
      }
    }
  }

  getThemes = () => {
    const { questionGroup, asks } = this.props;
    const { questionCode } = questionGroup;

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

  getInhertiableThemes = () => {
    return [
      ...isArray( this.props.inheritedThemes ) ? this.props.inheritedThemes : [],
      ...filterThemes(
        this.state.themes,
        this.props.themes,
        {
          onlyInheritableThemes: true,
        }
      ),
    ];
  }

  getStyling = () => {
    // filter links for panel
    const inheritedLinks = [
      ...filterThemes(
        this.props.inheritedThemes,
        this.props.themes,
        { formGroup: true },
      ),
    ];

    const panelLinks = [
      ...filterThemes(
        this.state.themes,
        this.props.themes,
        { formGroup: true },
      ),
    ];

    // get props from theme links
    const inheritedThemeProps = getPropsFromThemes( inheritedLinks, this.props.themes );
    const themeProps = getPropsFromThemes( panelLinks, this.props.themes );

    return {
      ...isObject( this.props.inheritedProps ) ? this.props.inheritedProps : {},
      ...inheritedThemeProps,
      ...themeProps,
    };
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
    const { questionCode, attributeCode, mandatory, question, contextList, readonly, placeholder } = ask;
    const baseEntityDefinition = dataTypes[attributeCode];
    const dataType = baseEntityDefinition && baseEntityDefinition.dataType;

    const isFormSubmit = isObject( contextList, { withProperty: 'isFormSubmit' }) ? contextList.isFormSubmit : false;

    const useAttributeNameAsValue = isObject( contextList, { withProperty: 'useAttributeNameAsValue' }) ? contextList.useAttributeNameAsValue : false;
    const useQuestionNameAsValue = isObject( contextList, { withProperty: 'useQuestionNameAsValue' }) ? contextList.useQuestionNameAsValue : false;

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
      testID: `${questionGroupCode}:${questionCode}` || '',
      ...contextList,
      parentGroupCode: questionGroupCode,
      rootQuestionGroupCode: this.props.rootCode,
      inheritedProps: isObject( this.props.inheritedProps ) ? this.props.inheritedProps : null,
      inheritedThemes: this.getInhertiableThemes(),
      ask,
      isClosed: this.props.isClosed,
      useAttributeNameAsValue: useAttributeNameAsValue,
      useQuestionNameAsValue: useQuestionNameAsValue,
      placeholder: question.placeholder || question.name,
    };

    return (
      <VisualControl
        key={questionCode}
        {...inputProps}
      />
    );
  }

  renderQuestionGroup = ( ask, index, form ) => {
    return (
      React.createElement(
        FormGroup,
        {
          questionGroup: ask,
          form: form,
          parentGroupCode: this.props.questionGroup.questionCode,
          rootCode: this.props.rootCode,
          inheritedProps: this.props.inheritedProps,
          inheritedThemes: this.getInhertiableThemes(),
          index: index,
          dataTypes: this.props.dataTypes,
          functions: this.props.functions,
          inputRefs: this.props.inputRefs,
          asks: this.props.asks,
          themes: this.props.themes,
          isClosed: this.props.isClosed,
        },
      )
    );
  }

  render() {
    const { index, questionGroup, form, parentGroupCode, rootCode } = this.props;
    const {
      name,
      childAsks,
      question,
      questionCode,
      // contextList,
    } = questionGroup;

    let properties = {};

    const checkThemeForProperties = ( themes ) => {
      if ( !isArray( themes )) return;

      themes.forEach( linkedTheme => {
        const themeProperties = dlv( this.props.themes, `${linkedTheme.code}.properties` );

        if ( isObject( themeProperties )) {
          properties = {
            ...properties,
            ...themeProperties,
          };
        }
      });
    };

    checkThemeForProperties( this.props.inheritedThemes );
    checkThemeForProperties( this.state.themes );

    if (
      properties.expandable
    ) {
      return (
        <Collapsible
          isClosed={this.props.isClosed}
          renderHeader={(
            question &&
            properties.renderQuestionGroupInput
          ) ? (
              this.renderInput(
                questionGroup,
                parentGroupCode,
                index,
                form,
              )
            ) : null
          }
          headerIconProps={this.getStyling()}
        >
          <Box
            key={name}
            zIndex={150 - index}
            {...defaultStyle.group}
            // padding={10}
            {...this.getStyling()}
          >
            {sort( childAsks, { paths: ['weight'], direction: 'desc' }).map(( childAsk, index ) => {
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

    if (
      properties.renderQuestionGroupInput
    ) {
      return (
        <EventTouchable
          withFeedback
          code={question.code}
          parentCode={parentGroupCode || questionCode}
          rootCode={rootCode}
        >
          <Box
            key={name}
            zIndex={150 - index}
            {...defaultStyle.group}
            borderColor
            {...this.getStyling()}
          >
            {sort( childAsks, { paths: ['weight'], direction: 'desc' }).map(( ask, index ) => {
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
        </EventTouchable>
      );
    }

    return (
      <Box
        key={name}
        zIndex={150 - index}
        {...defaultStyle.group}
        // padding={10}
        {...this.getStyling()}
      >
        {
          (
            question &&
            properties.renderQuestionGroupInput
          ) ? (
              this.renderInput(
                questionGroup,
                parentGroupCode,
                index,
                form,
              )) : null
        }
        {sort( childAsks, { paths: ['weight'], direction: 'desc' }).map(( ask, index ) => {
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
