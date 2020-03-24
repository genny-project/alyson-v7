import React, { Component } from 'react';
import { string, object, number, bool, array } from 'prop-types';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { isArray, isObject, getLayoutLinksOfType, checkForNewLayoutLinks, filterThemes, sort, getPropsFromThemes, objectMerge /* arrayAddDelimiter */ } from '../../../../utils';
import { Box, Collapsible, Dropdown, EventTouchable, Fragment, Text } from '../../index';
import UnityWrapper from '../../input/unity';
import UnityControl from '../../input/unity/control';
import { StatelessThemeHandler } from '../theme-handlers';
import VisualControl from '../visual-control';
import DataControl from '../data-control';

const components = [
  'group-wrapper',
  'group-label',
  'group-description',
  'group-input',
  'group-header-wrapper',
  'group-clickable-wrapper',
  'group-icon',
  'group-content-wrapper',
];

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
    data: object,
    types: object,
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
      // if ( shouldLog ) console.warn({ links: dlv( nextProps, `asks.${nextProps.questionGroup.questionCode}.links` ) });

      if ( checkForNewLayoutLinks(
        /* Valid links are added to the state key that matches their
        link type, so check all the state arrays together */

        this.state.themes,
        dlv( nextProps, `asks.${nextProps.questionGroup.questionCode}.links` ),
        this.props,
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
    const shouldLog = this.props.questionGroup.questionCode === 'QUE_TABLE_RESULTS_GRP';
    // const shouldLog = this.props.questionGroup.questionCode === 'QUE_TABLE_GRP';

    if ( shouldLog ) console.error( 'updateThemes', JSON.stringify( links ));

    /* check if the stateKey is valid  */
    this.setState({
      ['themes']: [
        ...links,
      ],
    }, () => {});
  }

  getInhertiableThemes = ( index, numberOfChildAsks ) => {
    // console.log( 'index', index );

    return [
      ...isArray( this.props.inheritedThemes ) ? this.props.inheritedThemes : [],
      ...filterThemes(
        this.state.themes,
        this.props.themes,
        {
          onlyInheritableThemes: true,
          childIndex: index,
          totalChildren: numberOfChildAsks,
        }
      ),
    ];
  }

  getStyling = ( componentType ) => {
    const { questionGroup, data, types } = this.props;
    const { attributeCode } = questionGroup;

    // const dataType = dlv( data, `${attributeCode}.dataType` );

    const dataTypeObject = dlv( data, `${attributeCode}.dataType` );

    const dataType = dlv( types, `${dataTypeObject}.typeName` );
    const dttCode = dlv( types, `${dataTypeObject}.dttCode` );

    // filter links for panel
    const inheritedLinks = [
      ...filterThemes(
        this.props.inheritedThemes,
        this.props.themes,
        {
          component: componentType,
          dataType: dataType,
          dttCode: dttCode,
          acceptTypes: ['group'],
        },
      ),
    ];

    const panelLinks = [
      ...filterThemes(
        this.state.themes,
        this.props.themes,
        {
          component: componentType,
          // dataType: dataType,
          dataType: dataType,
          dttCode: dttCode,
          acceptTypes: ['group'],
        },
      ),
    ];

    // if ( shouldLog ) console.warn({ state: JSON.stringify( this.state.themes ), links: JSON.stringify( panelLinks ) });

    // if ( shouldLog ) console.log( JSON.stringify({  ['THM_TABLE_CONTENT']: isObject( this.props.themes['THM_TABLE_CONTENT'] ), ['THM_WIDTH_100_PERCENT_NO_INHERIT']: isObject( this.props.themes['THM_WIDTH_100_PERCENT_NO_INHERIT'] ) }));
    // get props from theme links
    const inheritedThemeProps = getPropsFromThemes( inheritedLinks, this.props.themes );
    const themeProps = getPropsFromThemes( panelLinks, this.props.themes,  );

    // if (
    //   this.props.questionGroup.questionCode === 'QUE_TABLE_RESULTS_GRP'
    // ) console.warn({ inheritedThemeProps, themeProps });

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

  handleChangeFromUnity = ( form ) => ( data, { questionCode, ask, valuePath }) => {
    const {
      functions,
    } = this.props;
    const {
      setFieldValue,
      setFieldTouched,
      validateField,
    } = form;
    const {
      handleChange,
    } = functions;

    // questionCode comes from Unity Scene

    // ask: needs to come from Question. sent with Unity Context to Unity Wrapper?

    // console.log({ ask: this.props.asks });

    // valuePath: needs to come from Question. sent with Unity Context to Unity Wrapper?

    // value
    // sendValueOnChange
    handleChange({
      field: questionCode,
      setFieldValue,
      setFieldTouched,
      validateField,
      ask,
      valuePath,
    })(
      data,
      true
    );
  }

  renderInput = ({
    ask,
    questionGroupCode,
    index,
    form,
    additionalProps = {},
    options = {},
  }) => {
    const {
      data,
      types,
      functions,
      inputRefs,
    } = this.props;
    const {
      values,
      errors,
      touched,
      setFieldValue,
      setFieldTouched,
      validateField,
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

    const baseEntityDefinition = data[attributeCode];
    const dataType = baseEntityDefinition && baseEntityDefinition.dataType;
    const dataTypeObject = types[dataType];

    const { questionOnly } = options;
    const valuePath = `${questionOnly ? '' : `${this.props.groupPath}.`}${questionCode}`;

    const inputProps = {
      onChangeValue: handleChange({
        field: questionCode,
        setFieldValue,
        setFieldTouched,
        validateField,
        ask,
        valuePath,
      }),
      valuePath,
      value: values && dlv( values, valuePath ),
      type: isObject( dataTypeObject ) ? dataTypeObject.typeName.toLowerCase() : null,
      dttCode: isObject( dataTypeObject ) ? dataTypeObject.dttCode : null,
      mask: isObject( dataTypeObject ) ? dataTypeObject.inputmask : null,
      validation: isObject( dataTypeObject ) ? dataTypeObject.validationList : null,
      error: touched && dlv( touched, valuePath ) && errors && dlv( errors, valuePath ),
      onBlur: handleBlur( ask, valuePath ),
      required: mandatory,
      question,
      editable: !readonly, // <- display only
      // disabled: disabled, // <- input, but disabled
      ref: addRef,
      returnKeyType: (
        inputRefs[questionGroupCode] &&
        inputRefs[questionGroupCode][index + 1] // refs
      )
        ? 'next'
        : 'default',
      testID: `${questionGroupCode}:${questionCode}` || '',
      ...contextList,
      parentGroupCode: questionGroupCode || questionCode,
      rootQuestionGroupCode: this.props.rootCode,
      inheritedProps: isObject( this.props.inheritedProps ) ? this.props.inheritedProps : null,
      inheritedThemes: this.getInhertiableThemes(),
      ask,
      isClosed: this.props.isClosed,
      placeholder: placeholder || question.placeholder,
      index,
    };

    return (
      <DataControl
        key={questionCode}
        {...inputProps}
        {...additionalProps}
      >
        {( props ) => {
          // console.log({ value: values && dlv( values, valuePath ), maskValue: props.value });

          return (
            <UnityControl
              {...props}
              asks={this.props.asks}
            >
              <VisualControl
                {...props}
              />
            </UnityControl>
          );
        }}
      </DataControl>
    );
  }

  renderQuestionGroup = ( ask, index, numberOfChildAsks, form ) => {
    // if ( this.props.rootCode === 'QUE_TABLE_RESULTS_GRP' ) console.log({ index });

    return (
      React.createElement(
        FormGroup,
        {
          questionGroup: ask,
          form: form,
          parentGroupCode: this.props.questionGroup.questionCode,
          rootCode: this.props.rootCode,
          inheritedProps: this.props.inheritedProps,
          inheritedThemes: this.getInhertiableThemes( index, numberOfChildAsks ),
          index: index,
          data: this.props.data,
          types: this.props.types,
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
    const {
      index,
      questionGroup,
      form,
      parentGroupCode,
      rootCode,
      isClosed,
      data,
      types,
    } = this.props;
    const {
      description,
      name,
      childAsks,
      question,
      questionCode,
      targetCode,
      attributeCode,
    } = questionGroup;

    let properties = {};

    const checkThemeForProperties = ( themes ) => {
      if ( !isArray( themes )) return;
      // const dataType = dlv( data, `${attributeCode}.dataType` );

      const dataTypeObject = dlv( data, `${attributeCode}.dataType` );

      const dataType = dlv( types, `${dataTypeObject}.typeName` );
      const dttCode = dlv( types, `${dataTypeObject}.dttCode` );

      const themeLinks = [
        ...filterThemes(
          themes,
          this.props.themes,
          {
            // dataType: dataType,
            dataType: dataType,
            dttCode: dttCode,
            acceptTypes: ['group'],
          },
        ),
      ];

      themeLinks.forEach( linkedTheme => {
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

    const hasLabel = name && properties.renderQuestionGroupLabel;
    const hasDescription = description && properties.renderQuestionGroupDescription;
    // const hasDelimiter = properties.renderDelimiter;

    // const delimiterComponent = (
    //   <Box
    //     // delimiter props
    //     padding={5}
    //     {...this.getDelimiterStyling()['default']}
    //   />
    // );

    // const delimiterHandler = ( array ) => {
    //   return hasDelimiter ? arrayAddDelimiter( array, delimiterComponent ) : array;
    // };

    const labelComponent = ( props ) => (
      <Box
        // justifyContent="center"
        marginBottom={10}
        componentID="GROUP-LABEL"
        componentCode={questionCode}
        {...props}
      >
        <Text
          size="xl"
          // text={name}
          text={isClosed ? name.substring( 0, 1 ) : name}
          bold
          componentID="GROUP-LABEL"
          componentCode={questionCode}
          {...props}
        />
      </Box>
    );

    const descriptionComponent = ( props ) => (
      <Box
        marginBottom={10}
        componentID="GROUP-DESCRIPTION"
        componentCode={questionCode}
        {...props}
      >
        <Text
          size="sm"
          // text={description}
          text="This is question group"
          {...props}
        />
      </Box>
    );

    const headerWrapperComponent = ({ subcomponentProps }) => {
      if ( !hasLabel && !hasDescription ) return;

      return (
        <Box
          {...defaultStyle.group}
          componentID="GROUP-HEADER-WRAPPER"
          componentCode={questionCode}
          {...subcomponentProps['group-header-wrapper']}
        >
          { hasLabel ? labelComponent( subcomponentProps['group-label'] ) : null }
          { hasDescription ? descriptionComponent( subcomponentProps['group-description'] ) : null }
          {(
            question &&
            properties.renderQuestionGroupInput
          ) ? (
              this.renderInput({
                ask: questionGroup,
                questionGroupCode: parentGroupCode,
                index,
                form,
              })
            ) : null
          }
        </Box>
      );
    };

    const contentWrapperComponent = ( subcomponentProps ) => (
      <Box
        {...defaultStyle.group}
        componentID="GROUP-CONTENT-WRAPPER"
        componentCode={questionCode}
        {...subcomponentProps['group-content-wrapper']}
      >
        { sort( childAsks, { paths: ['weight'], direction: 'desc' }).map(( ask, index, array ) => {
          if (
            isArray( ask.childAsks, { ofMinLength: 1 }) &&
            properties.renderChildAsks !== false
          ) {
            return this.renderQuestionGroup(
              ask,
              index,
              array.length,
              form
            );
          }

          return this.renderInput({
            ask: ask,
            questionGroupCode: questionCode,
            index,
            form,
          });
        })}
      </Box>
    );

    if (
      !isArray( childAsks, { ofMinLength: 1 })
    ) {
      return this.renderInput({
        ask: questionGroup,
        questionGroupCode: questionCode,
        index,
        form,
        options: {
          questionOnly: true,
        },
      });
    }

    return (
      <StatelessThemeHandler
        getStyling={this.getStyling}
        componentTypes={components}
      >
        {({
          // onChangeState,
          // inputProps,
          componentProps,
        }) => {
          const subcomponentProps = componentProps;

          if (
            properties.expandable ||
            properties.dropdown
          ) {
            const WrapperElement = properties.dropdown ? Dropdown : Collapsible;

            return (
              <Box
                key={questionCode}
                justifyContent="center"
                flexDirection="column"
                componentID="GROUP-WRAPPER"
                componentCode={questionCode}
                {...subcomponentProps['group-wrapper']}
              >
                { hasLabel && !properties.renderQuestionGroupLabelInsideClickable ? labelComponent( subcomponentProps['group-label'] ) : null }
                { hasDescription ? descriptionComponent( subcomponentProps['group-description'] ) : null }
                {(
                  question &&
                  properties.renderQuestionGroupInput &&
                  !properties.renderQuestionGroupInputInsideClickable
                ) ? (
                    this.renderInput({
                      ask: questionGroup,
                      questionGroupCode: parentGroupCode,
                      index,
                      form,
                      additionalProps: {
                        flexWrapper: true,
                      },
                    })
                  ) : null }
                <WrapperElement
                  subcomponentProps={subcomponentProps}
                  isClosed={this.props.isClosed}
                  testID={`${parentGroupCode || questionCode}:${questionCode}${targetCode ? `:${targetCode}` : ''}`}
                  showIcon={(
                    properties.renderQuestionGroupIcon != null
                      ? properties.renderQuestionGroupIcon
                      : true
                  )}
                  questionCode={questionCode}
                  renderHeader={(
                    <Fragment>
                      { hasLabel && properties.renderQuestionGroupLabelInsideClickable ? labelComponent( subcomponentProps['group-label'] ) : null }
                      {(
                        question &&
                        properties.renderQuestionGroupInput &&
                        properties.renderQuestionGroupInputInsideClickable
                      ) ? (
                          this.renderInput({
                            ask: questionGroup,
                            questionGroupCode: parentGroupCode,
                            index,
                            form,
                            additionalProps: {
                              flexWrapper: true,
                            },
                          })
                        ) : null }
                    </Fragment>
                  )}
                >
                  {/* CONTENT WRAPPER ELEMENT */}
                  {contentWrapperComponent( subcomponentProps )}
                </WrapperElement>
              </Box>
            );
          }

          if (
            properties.renderAsUnityGroup
          ) {
            return (
              <Box
                key={questionCode}
                justifyContent="center"
                flexDirection="column"
                componentID="GROUP-WRAPPER"
                componentCode={questionCode}
                {...subcomponentProps['group-wrapper']}
              >
                { hasLabel && !properties.renderQuestionGroupLabelInsideClickable ? labelComponent( subcomponentProps['group-label'] ) : null }
                { hasDescription ? descriptionComponent( subcomponentProps['group-description'] ) : null }
                {(
                  question &&
                  properties.renderQuestionGroupInput &&
                  !properties.renderQuestionGroupInputInsideClickable
                ) ? (
                    this.renderInput({
                      ask: questionGroup,
                      questionGroupCode: parentGroupCode,
                      index,
                      form,
                      additionalProps: {
                        flexWrapper: true,
                      },
                    })
                  ) : null }
                <UnityWrapper
                  key={questionCode}
                  questionCode={questionCode}
                  onChangeValue={this.handleChangeFromUnity( form )}
                  renderHeader={(
                    <Fragment>
                      { hasLabel && properties.renderQuestionGroupLabelInsideClickable ? labelComponent( subcomponentProps['group-label'] ) : null }
                      {(
                        question &&
                        properties.renderQuestionGroupInput &&
                        properties.renderQuestionGroupInputInsideClickable
                      ) ? (
                          this.renderInput({
                            ask: questionGroup,
                            questionGroupCode: parentGroupCode,
                            index,
                            form,
                            additionalProps: {
                              flexWrapper: true,
                            },
                          })
                        ) : null }
                    </Fragment>
                  )}
                >
                  {/* CONTENT WRAPPER ELEMENT */}
                  {contentWrapperComponent( subcomponentProps )}
                </UnityWrapper>
              </Box>
            );
          }

          if (
            properties.renderQuestionGroupInput
          ) {
            return (
              <EventTouchable
                key={questionCode}
                withFeedback
                code={question.code}
                parentCode={parentGroupCode || questionCode}
                rootCode={rootCode}
                targetCode={targetCode}
                width="100%"
                onMouseEnter={() => this.handleHover( true )}
                onMouseLeave={() => this.handleHover( false )}
                {...defaultStyle.group}
                componentID="GROUP-WRAPPER"
                componentCode={questionCode}
                {...subcomponentProps['group-wrapper']}
                {...this.state.hover ? this.getStyling()['hover'] : {}}
              >
                {/* HEADER WRAPPER ELEMENT */}
                {headerWrapperComponent( subcomponentProps )}
                {/* CONTENT WRAPPER ELEMENT */}
                {contentWrapperComponent( subcomponentProps )}
              </EventTouchable>
            );
          }

          return (
            // WRAPPER ELEMENT
            <Box
              zIndex={100 - index}
              key={questionCode}
              {...defaultStyle.group}
              // padding={10}
              componentID="GROUP-WRAPPER"
              componentCode={questionCode}
              {...subcomponentProps['group-wrapper']}
            >
              {/* HEADER WRAPPER ELEMENT */}
              {headerWrapperComponent({ subcomponentProps })}
              {/* CONTENT WRAPPER ELEMENT */}
              {contentWrapperComponent( subcomponentProps )}
            </Box>
          );
        }
      }
      </StatelessThemeHandler>
    );
  }
}

export { FormGroup };

const mapStateToProps = state => ({
  data: state.vertx.baseEntities.definitions.data,
  types: state.vertx.baseEntities.definitions.types,
  themes: state.vertx.layouts.themes,
  asks: state.vertx.layouts.asks,
});

export default connect( mapStateToProps )( FormGroup );
