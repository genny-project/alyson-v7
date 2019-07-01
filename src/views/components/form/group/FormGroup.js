import React, { Component } from 'react';
import { string, object, number, bool, array } from 'prop-types';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { isArray, isObject, isString, getLayoutLinksOfType, checkForNewLayoutLinks, filterThemes, sort, getPropsFromThemes, objectMerge, arrayAddDelimiter } from '../../../../utils';
import { Box, Collapsible, EventTouchable, Fragment, Text } from '../../index';
import VisualControl from '../visual-control';

const defaultStyle = {
  group: {
    flexDirection: 'column',
    position: 'relative',
    // flex: 1,
    // width: '100%',
  },
};

class FormGroup extends Component {
  static propTypes = {
    rootCode: string,
    parentGroupCode: string,
    questionGroup: object,
    form: object,
    inheritedThemes: array,
    inheritedProps: object,
    index: number,
    dataTypes: object,
    functions: object,
    inputRefs: object,
    themes: object,
    asks: object,
    isClosed: bool,
    indexNumber: number,
    groupPath: string,
  }

  state = {
    themes: [],
    hover: false,
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

  handleHover = ( hover ) => {
    if ( hover !== this.state.hover ) {
      this.setState({
        hover: hover,
      });
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
        {
          formGroup: true,
        },
      ),
    ];

    const panelLinks = [
      ...filterThemes(
        this.state.themes,
        this.props.themes,
        {
          formGroup: true,
        },
      ),
    ];

    // get props from theme links
    const inheritedThemeProps = getPropsFromThemes( inheritedLinks, this.props.themes );
    const themeProps = getPropsFromThemes( panelLinks, this.props.themes );

    const combinedThemeProps = objectMerge(
      isObject( this.props.inheritedProps ) ? this.props.inheritedProps : {},
      objectMerge( inheritedThemeProps, themeProps )
    );

    return {
      ...combinedThemeProps,
    };
  }

  getDelimiterStyling = () => {
    // filter links for panel
    const inheritedLinks = [
      ...filterThemes(
        this.props.inheritedThemes,
        this.props.themes,
        {
          component: 'delimiter',
          onlyComponentThemes: true,
        },
      ),
    ];

    const panelLinks = [
      ...filterThemes(
        this.state.themes,
        this.props.themes,
        {
          component: 'delimiter',
          onlyComponentThemes: true,
        },
      ),
    ];

    // get props from theme links
    const inheritedThemeProps = getPropsFromThemes( inheritedLinks, this.props.themes );
    const themeProps = getPropsFromThemes( panelLinks, this.props.themes );

    const combinedThemeProps = objectMerge( inheritedThemeProps, themeProps );

    return {
      ...combinedThemeProps,
    };
  }

  renderInput = (
    ask,
    questionGroupCode,
    index,
    form,
    additionalProps,
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
    } = form;
    const {
      handleChange,
      // handleFocusNextInput,
      handleBlur,
      addRef,
    } = functions;
    const {
      questionCode,
      attributeCode,
      mandatory,
      question,
      contextList,
      readonly,
      placeholder,
      // disabled,
    } = ask;

    const baseEntityDefinition = dataTypes[attributeCode];
    const dataType = baseEntityDefinition && baseEntityDefinition.dataType;

    const useAttributeNameAsValue = isObject( contextList, { withProperty: 'useAttributeNameAsValue' }) ? contextList.useAttributeNameAsValue : false;
    const useQuestionNameAsValue = isObject( contextList, { withProperty: 'useQuestionNameAsValue' }) ? contextList.useQuestionNameAsValue : false;

    const valuePath = `${this.props.groupPath}.${questionCode}`;

    const inputProps = {
      onChangeValue: handleChange(
        questionCode,
        setFieldValue,
        setFieldTouched,
        ask,
        valuePath,
      ),
      value: values && dlv( values, valuePath ),
      type: isString( dataType ) ? dataType.toLowerCase() : dataType,
      error: touched && dlv( touched, valuePath ) && errors && dlv( errors, valuePath ),
      onBlur: handleBlur( ask, valuePath ),
      required: mandatory,
      question,
      editable: !readonly,
      // disabled: disabled,
      ref: addRef,
      returnKeyType: (
        inputRefs[questionGroupCode] &&
        inputRefs[questionGroupCode][index + 1] // refs
      )
        ? 'next'
        : 'default',
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
      placeholder: placeholder || question.placeholder,
      index,
    };

    return (
      <VisualControl
        key={questionCode}
        {...inputProps}
        {...additionalProps}
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
          groupPath: `${this.props.groupPath}.${ask.questionCode}`,
        },
      )
    );
  }

  render() {
    const { index, questionGroup, form, parentGroupCode, rootCode } = this.props;
    const {
      description,
      name,
      childAsks,
      question,
      questionCode,
      targetCode,
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

    const hasTitle = name && properties.renderQuestionGroupTitle;
    const hasDescription = description && properties.renderQuestionGroupDescription;
    const hasDelimiter = properties.renderDelimiter;

    const delimiterComponent = (
      <Box
        // delimiter props
        padding={5}
        {...this.getDelimiterStyling()['default']}
      />
    );

    const delimiterHandler = ( array ) => {
      return hasDelimiter ? arrayAddDelimiter( array, delimiterComponent ) : array;
    };

    if (
      !isArray( childAsks, { ofMinLength: 1 })
    ) {
      return this.renderInput(
        questionGroup,
        questionCode,
        index,
        form,
      );
    }

    if (
      properties.expandable
    ) {
      return (
        <Collapsible
          isClosed={this.props.isClosed}
          testID={`${parentGroupCode}:${questionCode}:COLLAPSIBLE`}
          renderHeader={(
            question &&
            properties.renderQuestionGroupInput
          ) ? (
              this.renderInput(
                questionGroup,
                parentGroupCode,
                index,
                form,
                {
                  flexWrapper: true,
                }
              )
            ) : null
          }
          headerIconProps={this.getStyling()['default']}
        >
          <Box
            key={name}
            // zIndex={20 - index}
            {...defaultStyle.group}
            {...this.getStyling()['default']}
          >
            {hasDelimiter && delimiterComponent}
            {delimiterHandler(
              sort( childAsks, { paths: ['weight'], direction: 'desc' }).map(( childAsk, index ) => {
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
              })
            )}
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
          targetCode={targetCode}
          width="100%"
          onMouseEnter={() => this.handleHover( true )}
          onMouseLeave={() => this.handleHover( false )}
          {...defaultStyle.group}
          {...this.getStyling()['default']}
          {...this.state.hover ? this.getStyling()['hover'] : {}}
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
        </EventTouchable>
      );
    }

    return (
      <Fragment>
        <Box
          key={name}
          zIndex={50 - index}
          {...defaultStyle.group}
          // padding={10}
          {...this.getStyling()['default']}
        >
          {
            (
              hasTitle ||
              hasDescription
            ) ? (
              <Box
                marginBottom={10}
                padding={10}
                flexDirection="column"
              >
                {
                  hasTitle ? (
                    <Box
                      // justifyContent="center"
                      marginBottom={10}
                    >
                      <Text
                        size="xl"
                        text={name}
                        bold
                      />
                    </Box>
                  ) : null
                }
                {
                  hasDescription ? (
                    <Box>
                      <Text
                        size="sm"
                        text={description}
                      />
                    </Box>
                  ) : null
                }
              </Box>
              ) : null
          }
          {(
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
          {delimiterHandler(
            sort( childAsks, { paths: ['weight'], direction: 'desc' }).map(( ask, index ) => {
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
            })
          )}
        </Box>
      </Fragment>
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
