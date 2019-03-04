import React, { Component } from 'react';
import { string, object, number } from 'prop-types';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { isArray, isObject, isString, getLayoutLinksOfType, checkForNewLayoutLinks, checkForNewInheritedThemes, filterThemes } from '../../../../utils';
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

  /* eslint-disable react/sort-comp */

  componentDidMount() {
    this.getThemes();
  }

  shouldComponentUpdate( nextProps ) {
    /* If rootCode is different, then a different base
    entity needs to be rendered inside the frame */
    const { questionGroup, asks } = nextProps;
    const { questionCode } = questionGroup;

    // console.log( 'shouldComponentUpdate', questionCode );

    if ( !asks || !asks[questionCode] ) {
      return false;
    }

    if ( this.props.questionGroup !== nextProps.questionGroup )
      return true;

    /* Check if any of the links of the root base entity have changed */
    if (  isObject( dlv( nextProps, `asks.${nextProps.rootCode}` ))) {
      if ( checkForNewLayoutLinks(
        /* Valid links are added to the state key that matches their
        link type, so check all the state arrays together */

        this.state.themes,
        dlv( nextProps, `asks.${nextProps.rootCode}.links` ),
        nextProps,
      )) {
        return true;
      }
    }

    /* Check if the inherited themes have changed */
    if ( checkForNewInheritedThemes( this.props.inheritedThemes, nextProps.inheritedThemes ))
      return true;

    return false;
  }

  componentDidUpdate() {
    this.getThemes();
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
      inheritedThemes: this.getStyling( true ),
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
    return (
      React.createElement(
        FormGroup,
        {
          questionGroup: ask,
          form: form,
          rootCode: this.props.rootCode,
          inheritedThemes: this.getStyling( true ),
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
    const { index, questionGroup, form } = this.props;
    const {
      name,
      childAsks,
      question,
      questionCode,
      contextList,
    } = questionGroup;

    const isDropdown = isObject( contextList, { withProperty: 'isDropdown' }) ? contextList.isDropdown : false;

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
          headerIconProps={this.getStyling( true )}
        >
          <Box
            key={name}
            zIndex={150 - index}
            {...defaultStyle.group}
            padding={10}
            {...this.getStyling()}
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
        {...defaultStyle.group}
        padding={10}
        {...this.getStyling()}
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
