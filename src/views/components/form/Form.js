import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { string, object, bool } from 'prop-types';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { isArray, isObject, isString } from '../../../utils';
import { Bridge } from '../../../utils/vertx';
import shallowCompare from '../../../utils/shallow-compare';
import { Box, Text, Fragment } from '../index';
import FormGroup from './group';

class Form extends Component {
  static defaultProps = {
    loadingText: 'Loading form...',
    testID: 'form',
    shouldSetInitialValues: true,
    inheritedProps: {},
  }

  static propTypes = {
    questionGroupCode: string,
    asks: object,
    baseEntities: object,
    loadingText: string,
    testID: string,
    shouldSetInitialValues: bool,
    inheritedProps: object,
    fullWidth: bool,
    isClosed: bool,
  }

  inputRefs = {}

  state = {
    validationList: {},
    initialValues: {},
    questionGroups: [],
    formStatus: null,
    missingBaseEntities: [],
  }

  componentDidMount() {
    this.setInitialValues();
    this.setValidationList();
  }

  componentDidUpdate( prevProps, prevState ) {
    const { questionGroupCode } = this.props;
    const { questionGroups } = this.state;

    const checkIfSetNeeded = () => {
      return (
        this.state.questionGroups.length !== prevState.questionGroups.length ||
        questionGroupCode !== prevProps.questionGroupCode
      );
    };

    if (
      questionGroupCode !== prevProps.questionGroupCode ||
      isArray( questionGroups, { ofExactLength: 0 })
    ) {
      const newGroups = this.getQuestionGroups();

      if ( newGroups.length > 0 ) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ questionGroups: newGroups, missingBaseEntities: [] }, () => {
          if ( checkIfSetNeeded ) {
            this.setInitialValues();
            this.setValidationList();
          }
        });
      }
    }

    else if (
      isArray( this.state.missingBaseEntities, { ofMinLength: 1 })
    ) {
      if (
        this.checkIfNewBaseEntities( this.props )
      ) {
        this.setInitialValues();
        this.setValidationList();
      }
    }

    else if (
      this.checkForUpdatedQuestionTargets( this.props )
    ) {
      const newGroups = this.getQuestionGroups();

      if ( newGroups.length > 0 ) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ questionGroups: newGroups, missingBaseEntities: [] }, () => {
          if ( checkIfSetNeeded ) {
            this.setInitialValues();
            this.setValidationList();
          }
        });
      }
    }

    else if (
      this.checkForUpdatedAttributeValues( this.props )
    ) {
      this.setInitialValues();
      this.setValidationList();
    }
  }

  setInitialValues = () => {
    const { questionGroups } = this.state;
    const { attributes } = this.props.baseEntities;

    if ( !isArray( questionGroups, { ofMinLength: 1 })) {
      return;
    }

    const checkForBE = ( code ) => {
      const beAttributes = dlv( attributes, `${code}` );

      if (
        !isObject( beAttributes, { isNotEmpty: true }) &&
        !this.state.missingBaseEntities.includes( code )
      ) {
        this.setState( state => ({
          missingBaseEntities: state.missingBaseEntities.includes( code )
            ? [...state.missingBaseEntities]
            : [...state.missingBaseEntities, code],
        }));
      }
      else if (
        isObject( beAttributes, { isNotEmpty: true }) &&
        this.state.missingBaseEntities.includes( code )
      ) {
        this.setState( state => ({
          missingBaseEntities: state.missingBaseEntities.filter( beCode => beCode !== code ),
        }));
      }
    };

    const initialValues = {};

    const setQuestionValue = ( ask ) => {
      // handle targetCode
      if ( isObject( ask, { withProperty: 'targetCode' })) {
        checkForBE( ask.targetCode );
        const value = dlv( attributes, `${ask.targetCode}.${ask.attributeCode}.value` );

        if ( value || ask.mandatory )
          initialValues[ask.questionCode] = value || null;
      }

      if ( isArray( ask.childAsks, { ofMinLength: 1 })) {
        ask.childAsks.forEach( childAsk => {
          setQuestionValue( childAsk );
        });
      }
    };

    questionGroups.forEach( questionGroup => {
      setQuestionValue( questionGroup );
    });

    if ( Object.keys( initialValues ).length > 0 && this.props.shouldSetInitialValues ) {
      this.setState({ initialValues });
    }
  }

  setValidationList() {
    const { questionGroups } = this.state;
    const { data } = this.props.baseEntities.definitions;

    if ( !isArray( questionGroups, { ofMinLength: 1 })) {
      this.setState({ validationList: {} });

      return;
    }

    const validationList = {};

    const setValidation = ( ask ) => {
      // handle targetCode
      if ( isObject( ask, { withProperty: 'targetCode' })) {
        const dataType = dlv( data, `${ask.attributeCode}.dataType` );

        validationList[ask.questionCode] = {
          dataType,
          required: ask.mandatory,
        };
      }

      if ( isArray( ask.childAsks, { ofMinLength: 1 })) {
        ask.childAsks.forEach( childAsk => {
          setValidation( childAsk );
        });
      }
    };

    questionGroups.forEach( questionGroup => {
      setValidation( questionGroup );
    });

    this.setState({ validationList });
  }

  /* Default to using `this.props`, allowing for `prevProps` to be
   * passed to this fn inside of `componentDidUpdate`. */
  getQuestionGroups( props = this.props ) {
    const { questionGroupCode, asks } = props;

    /* questionGroupCode from here is a string, so check if the ask exists
     * for this questionGroupCode key. If exists, return it inside of an array. */
    if ( asks[questionGroupCode] ) {
      return [
        asks[questionGroupCode],
      ];
    }

    /* If nothing works, return an empty array. */
    return [];
  }

  checkIfNewBaseEntities = ( newProps ) => {
    const { missingBaseEntities } = this.state;

    const result = missingBaseEntities.some( beCode => {
      return (
        dlv( newProps, `baseEntities.data.${beCode}` ) &&
        isObject( dlv( newProps, `baseEntities.attributes.${beCode}` ), { isNotEmpty: true })
      );
    });

    return result;
  }

  checkForUpdatedQuestionTargets = ( newProps ) => {
    const { questionGroups } = this.state;
    const newQuestionGroup = newProps.asks[newProps.questionGroupCode];

    if ( questionGroups.length < 1 ) return false;

    const compareTargetCode = ( newAsk, existingAsk ) => {
      if ( !newAsk.question && !existingAsk.question ) return false;

      if ( !newAsk.question || !existingAsk.question ) return true;

      const newQuestionCode = newAsk.questionCode;
      const newTargetCode = newAsk.targetCode;

      const existingQuestionCode = existingAsk.questionCode;
      const existingTargetCode = existingAsk.targetCode;

      const isMatch = (
        newQuestionCode === existingQuestionCode &&
        newTargetCode === existingTargetCode
      );

      if ( isMatch ) return false;

      const isChildMatch = newAsk.childAsks.some(( childAsk, index ) => {
        return compareTargetCode( childAsk, existingAsk.childAsks[index], index );
      });

      return !isChildMatch;
    };

    const isDifference = newQuestionGroup.childAsks.some(( childAsk, index ) => {
      return compareTargetCode( childAsk, questionGroups[0].childAsks[index], index );
    });

    return isDifference;
  };

  checkForUpdatedAttributeValues = ( newProps ) => {
    /* identify the attributes for each question */

    const { initialValues } = this.state;
    const newQuestionGroup = newProps.asks[newProps.questionGroupCode];

    const compareAttributeValues = ( ask ) => {
      if ( !ask.question ) return false;

      const questionCode = ask.questionCode;
      const target = ask.targetCode;
      const attributeCode = ask.question.attributeCode;
      const baseEntityAttributeValue = dlv( newProps, `baseEntities.attributes.${target}.${attributeCode}.value` );

      const isMatch = (
        initialValues[questionCode] == null &&
        baseEntityAttributeValue == null
      ) ||
      initialValues[questionCode] === baseEntityAttributeValue;

      if ( isMatch ) return false;

      const isChildMatch = ask.childAsks.some(
        childAsk => compareAttributeValues( childAsk )
      );

      return !isChildMatch;
    };

    const isDifference = newQuestionGroup.childAsks.some(
      childAsk => compareAttributeValues( childAsk )
    );

    return isDifference;
  }

  checkIfFullWidth = ( questionGroups ) => {
    return questionGroups.some( questionGroup => {
      return isObject( questionGroup.contextList, { withProperty: 'fullWidth' })
        ? questionGroup.contextList.fullWidth
        : false;
    });
  }

  doValidate = values => {
    if ( !values )
      return {};

    const { validationList } = this.state;
    const { types } = this.props.baseEntities.definitions;
    const newState = {};

    Object.keys( values ).forEach( field => {
      const validationData = validationList[field];

      if ( !validationData ) {
        return;
      }

      const { dataType, required } = validationData;
      const validationArray = types[dataType] && types[dataType].validationList;

      if ( !isArray( validationArray, { ofMinLength: 1 })) {
        return;
      }

      if (
        isArray( Object.keys( values ), { ofExactLength: 1 }) &&
        types[dataType] &&
        types[dataType].typeName === 'java.lang.Boolean'
      ) {
        return {};
      }

      let error = null;

      if (
        values[field] == null &&
        required
      ) {
        newState[field] = 'Please enter this field';
        // errors.push( 'Please enter this field' );
      }

      const isValid = validationArray.every( validation => {
        const doesPass = new RegExp( validation.regex ).test( String( values[field] ));

        if ( !doesPass ) {
          // errors.push( validation.errorMessage );
          error = validation.errorMessage;
        }

        return doesPass;
      });

      // console.log( 'errors', errors );

      if ( !isValid )
        newState[field] = error;
        // newState[field] = errors;
    });

    return newState;
  }

  sendAnswer = ( ask, newValue ) => {
    let finalValue = newValue;
    let finalAttributeCode = ask.attributeCode;

    if ( ask.attributeCode.indexOf( 'ADDRESS_FULL' ) !== -1 ) {
      finalAttributeCode = ask.attributeCode.replace( 'ADDRESS_FULL', 'ADDRESS_JSON' );
    }
    else if ( ask.attributeCode.indexOf( 'PRI_RATING' ) !== -1 ) {
      finalAttributeCode = 'PRI_RATING_RAW';
    }

    /* If the form is an object or an array, stringify it. */
    if (
      isObject( finalValue ) ||
      isArray( finalValue )
    ) {
      finalValue = JSON.stringify( finalValue );
    }
    // eslint-disable-next-line no-console
    console.warn( 'sending answer...', {
      askId: ask.id,
      attributeCode: finalAttributeCode,
      sourceCode: ask.sourceCode,
      targetCode: ask.targetCode,
      code: ask.questionCode,
      questionGroup: this.getQuestionGroups().name, // doesnt work, returns an array
      identifier: ask.questionCode,
      weight: ask.weight,
      value: finalValue,
    });

    Bridge.sendAnswer( [{
      askId: ask.id,
      attributeCode: finalAttributeCode,
      sourceCode: ask.sourceCode,
      targetCode: ask.targetCode,
      code: ask.questionCode,
      questionGroup: this.getQuestionGroups().name, // doesnt work, returns an array
      identifier: ask.questionCode,
      weight: ask.weight,
      value: finalValue,
    }] );
  }

  handleChange = ( field, setFieldValue, setFieldTouched, ask ) => ( value, sendOnChange ) => {
    if ( value == null )
      return;

    // console.log({ field, setFieldValue, setFieldTouched, ask, value, sendOnChange });

    setFieldValue( field, value );
    setFieldTouched( field, true );

    if ( sendOnChange )
      this.sendAnswer( ask, value );
  }

  handleFocusNextInput = ( questionGroupCode, currentFocusedIndex ) => () => {
    if (
      this.inputRefs[questionGroupCode] &&
      this.inputRefs[questionGroupCode][currentFocusedIndex + 1] &&
      this.inputRefs[questionGroupCode][currentFocusedIndex + 1].focus
    ) {
      this.inputRefs[questionGroupCode][currentFocusedIndex + 1].focus();
    }
  }

  handleSubmit = ( values, form ) => {
    // console.log( 'handle submit' );
    if ( form ) {
      const { setSubmitting } = form;

      setSubmitting( true );
    }

    const { questionGroups, formStatus } = this.state;

    const questionGroup = questionGroups.find( group => {
      return group.attributeCode.includes( 'BUTTON' );
    }) || (
      questionGroups.length > 0 &&
      questionGroups[0]
    );

    if ( !questionGroup ) {
      // eslint-disable-next-line no-console
      console.warn( 'Could not submit form - no question group associated with form.' );

      return;
    }

    /* send event to back end */
    const eventData = {
      code: questionGroup.questionCode,
      value: JSON.stringify({
        targetCode: questionGroup.targetCode,
        action: formStatus || 'submit',
      }),
    };

    Bridge.sendButtonEvent( 'FORM_SUBMIT', eventData );
  }

  handleBlur = ( ask, values, errors ) => () => {
    if ( ask ) {
      const questionCode = ask.questionCode;

      if (
        questionCode &&
        values &&
        values[questionCode] &&
        (
          !errors ||
          !errors[questionCode]
        )
      ) {
        this.sendAnswer( ask, values[questionCode] );
      }
    }
  }

  handleKeyPress = ( submitForm, index, questionGroupCode ) => ( e ) => {
    const key = e.key;
    const formLength = (
      this.inputRefs[questionGroupCode] &&
      Object.keys( this.inputRefs[questionGroupCode] ).length
    );

    switch ( key ) {
      case 'Enter':
        if ( formLength === index + 1 ) {
          submitForm();
        }
        break;
      default:
        return null;
    }
  }

  renderQuestionGroup = ( questionGroup, index, form, ) => {
    const functions = {
      handleChange: ( questionCode, setFieldValue, setFieldTouched, ask ) =>
        this.handleChange( questionCode, setFieldValue, setFieldTouched, ask ),
      handleFocusNextInput: ( code, index ) =>
        this.handleFocusNextInput( code, index ),
      handleBlur: ( ask, values, errors ) =>
        this.handleBlur( ask, values, errors ),
      handleKeyPress: ( submitForm, index, questionGroupCode ) =>
        this.handleKeyPress( submitForm, index, questionGroupCode ),
      addRef: ( questionGroupCode, index, input ) =>
        this.inputRefs[questionGroupCode] = {
          ...this.inputRefs[questionGroupCode],
          [index]: input,
        },
    };

    return (
      <FormGroup
        key={questionGroup.questionCode}
        questionGroup={questionGroup}
        form={form}
        rootCode={this.props.questionGroupCode}
        inheritedProps={this.props.inheritedProps}
        index={index}
        functions={functions}
        inputRefs={this.inputRefs}
        isClosed={this.props.isClosed}
      />
    );
  }

  render() {
    const {
      loadingText,
      testID,
      fullWidth,
    } = this.props;
    const { questionGroups } = this.state;

    if ( !isArray( questionGroups, { ofMinLength: 1 })) {
      return (
        <Box
          flexDirection="column"
          {...fullWidth ? { width: '100%' } : {}}
          justifyContent="center"
          alignItems="center"
          flexShrink={0}
          testID={testID}
        >
          <ActivityIndicator size="large" />
          {
            loadingText != null &&
            isString( loadingText )
              ? (
                <Box
                  marginTop={10}
                >
                  <Text
                    align="center"
                  >
                    {loadingText}
                  </Text>
                </Box>
              )
              : null
          }
        </Box>
      );
    }

    const { initialValues } = this.state;

    return (
      <Formik
        initialValues={initialValues}
        validate={( values ) => this.doValidate( values )}
        onSubmit={this.handleSubmit}
        validateOnBlur
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          submitForm,
          submitCount,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
        }) => {
          const isFormValid = shallowCompare( this.doValidate( values ), {});

          return (
            // <KeyboardAwareScrollView
            //   testID={testID}
            // >
            <Fragment>
              {questionGroups.map(( questionGroup, index ) => {
                return this.renderQuestionGroup(
                  questionGroup,
                  index,
                  {
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    setFieldTouched,
                    isSubmitting,
                    submitCount,
                    submitForm,
                    isFormValid,
                  }
                );
              })}
            </Fragment>
            // </KeyboardAwareScrollView>
          );
        }}
      </Formik>
    );
  }
}

export { Form };

const mapStateToProps = state => ({
  baseEntities: state.vertx.baseEntities,
  aliases: state.vertx.aliases,
  asks: state.vertx.asks,
});

export default connect( mapStateToProps )( Form );
