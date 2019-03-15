import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { string, object, oneOfType, array, bool } from 'prop-types';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { isArray, isObject, isString } from '../../../utils';
import { Bridge } from '../../../utils/vertx';
import shallowCompare from '../../../utils/shallow-compare';
import { Box, Text, KeyboardAwareScrollView, Fragment } from '../index';
import FormGroup from './group';

class Form extends Component {
  static defaultProps = {
    loadingText: 'Loading form...',
    testID: 'form',
    shouldSetInitialValues: true,
    inheritedThemes: {},
  }

  static propTypes = {
    questionGroupCode: oneOfType(
      [string, array]
    ),
    asks: object,
    baseEntities: object,
    loadingText: string,
    testID: string,
    shouldSetInitialValues: bool,
    inheritedThemes: object,
    fullWidth: bool,
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
      isString( questionGroupCode ) &&
      questionGroupCode !== prevProps.questionGroupCode
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
      isString( questionGroupCode ) &&
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
      isArray( questionGroupCode ) &&
      questionGroupCode.length !== questionGroups.length
    ) {
      const newGroups = this.getQuestionGroups();
      const prevGroups = this.getQuestionGroups( prevProps );

      if ( newGroups.length !== prevGroups.length ) {
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

    questionGroups.forEach( questionGroup => {
      if ( !isArray( questionGroup.childAsks, { ofMinLength: 1 }))
        return;

      questionGroup.childAsks.forEach( ask => {
        if ( isArray( ask.childAsks, { ofMinLength: 1 })) {
          ask.childAsks.forEach( childAsk => {
            checkForBE( childAsk.targetCode );

            const value = dlv( attributes, `${childAsk.targetCode}.${childAsk.attributeCode}.value` );

            /* TODO: better handle `false` value */
            if ( value || childAsk.mandatory ) {
              initialValues[childAsk.questionCode] = value || null;
            }
          });
        }

        else {
          checkForBE( ask.targetCode );

          const value = (
            attributes[ask.targetCode] &&
            attributes[ask.targetCode][ask.attributeCode] &&
            attributes[ask.targetCode][ask.attributeCode].value
          );

          /* TODO: better handle `false` value */
          if ( value || ask.mandatory )
            initialValues[ask.questionCode] = value || null;
        }
      });
    });

    if ( Object.keys( initialValues ).length > 0 && this.props.shouldSetInitialValues )
      this.setState({ initialValues });
  }

  setValidationList() {
    const { questionGroups } = this.state;
    const { data } = this.props.baseEntities.definitions;

    if ( !isArray( questionGroups, { ofMinLength: 1 })) {
      this.setState({ validationList: {} });

      return;
    }

    const validationList = {};

    questionGroups.forEach( questionGroup => {
      if ( !isArray( questionGroup.childAsks, { ofMinLength: 1 })) {
        return;
      }

      questionGroup.childAsks.forEach( ask => {
        const dataType = (
          data[ask.attributeCode] &&
          data[ask.attributeCode].dataType
        );

        validationList[ask.questionCode] = {
          dataType,
          required: ask.mandatory,
        };
      });
    });

    this.setState({ validationList });
  }

  /* Default to using `this.props`, allowing for `prevProps` to be
   * passed to this fn inside of `componentDidUpdate`. */
  getQuestionGroups( props = this.props ) {
    const { questionGroupCode, asks } = props;

    /* questionGroupCode here is an array, so loop through the keys and
     * push the ask to the array if it exists. */
    if ( questionGroupCode instanceof Array ) {
      return questionGroupCode.reduce(( questionGroups, code ) => {
        if ( asks[code] )
          questionGroups.push( asks[code] );

        return questionGroups;
      }, [] );
    }

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

  checkIfFullWidth = ( questionGroups ) => {
    return questionGroups.some( questionGroup => {
      return isObject( questionGroup.contextList, { withProperty: 'fullWidth' })
        ? questionGroup.contextList.fullWidth
        : false;
    });
  }

  doValidate = values => {
    // console.log( 'do validate' );
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

      if (
        values[field] == null &&
        required
      ) {
        newState[field] = 'Please enter this field';
      }

      const isValid = validationArray.every( validation => {
        return new RegExp( validation.regex ).test( String( values[field] ));
      });

      if ( !isValid )
        newState[field] = 'Error';
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
      questionGroup: this.getQuestionGroups().name,
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
      questionGroup: this.getQuestionGroups().name,
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
        inheritedThemes={this.props.inheritedThemes}
        index={index}
        functions={functions}
        inputRefs={this.inputRefs}
      />
    );
  }

  render() {
    const {
      questionGroupCode,
      loadingText,
      testID,
      fullWidth,
    } = this.props;
    const { questionGroups } = this.state;

    if (
      !isArray( questionGroups, { ofMinLength: 1 }) ||
      (
        isArray( questionGroupCode ) &&
        questionGroupCode.length !== questionGroups.length
      )
    ) {
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

    // check the top level groups to see if any have 'fullWidth: true' in the contextList
    const isFullWidth = fullWidth != null ? fullWidth : this.checkIfFullWidth( questionGroups );

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
          handleSubmit,
        }) => {
          const isFormValid = shallowCompare( this.doValidate( values ), {});

          return (
            <KeyboardAwareScrollView
              testID={testID}
            >
              <Box
                // accessibilityRole="form"
                flexDirection="column"
                // flex={1}
                {...isFullWidth ? { width: '100%' } : {}}
                onSubmit={handleSubmit}
                // backgroundColor="white"
              >
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
              </Box>
            </KeyboardAwareScrollView>
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
