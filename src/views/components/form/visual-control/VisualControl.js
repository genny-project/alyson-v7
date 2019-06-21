import React, { Component } from 'react';
import { string, object, bool, number, func } from 'prop-types';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { isArray, isObject, isString, getLayoutLinksOfType, checkForNewLayoutLinks, filterThemes, getPropsFromThemes, objectMerge } from '../../../../utils';
import { Box, Text, Icon /* Tooltip */ } from '../../../components';
import FormInput from '../input';

/*
const linkValues = [
  'wrapper',
  'input',
  'icon',
  'label',
  'description',
  'hint',
  'error',
  'required',
];

const inputStates = [
  'default',
  'hover',
  'active',
  'disabled',
];
*/
const subcomponents = [
  'input-field',
  'input-wrapper',
  'input-icon',
  'input-item-wrapper',
  'input-item',
  'input-selected-wrapper',
  'input-selected',
];

class VisualControl extends Component {
  static propTypes = {
    // type: string.isRequired,
    question: object,
    // onChangeValue: func.isRequired,
    ask: object,
    asks: object,
    attributes: object,
    inheritedProps: object,
    inheritedThemes: object,
    themes: object,
    error: string,
    required: bool,
    editable: bool,
    disabled: bool,
    flexWrapper: bool,
    index: number,
    onBlur: func,
    onFocus: func,
    onChange: func,
    onChangeValue: func,
  }

  state = {
    themes: [],
  }

  /* eslint-disable react/sort-comp */

  componentDidMount() {
    this.getThemes();
  }

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

    if ( !ask ) return null;

    const { questionCode } = ask;

    if ( !asks || !asks[questionCode] ) return null;

    const askData = asks[questionCode];

    /* filter each of the links based on their type */
    const linkedThemes = getLayoutLinksOfType( askData.links, this.props, 'theme' );

    /* update the state  */
    this.updateThemes( linkedThemes );
  }

  getIcon = () => {
    const { ask, asks } = this.props;

    if ( !ask ) return null;

    const { questionCode } = ask;

    if ( !asks || !asks[questionCode] ) return null;

    if (
      isObject( ask, { withProperty: 'questionCode' }) &&
      isObject( asks, { withProperty: questionCode }) &&
      isObject(  asks[questionCode], { withProperty: 'links' }) &&
      isArray( asks[questionCode].links.filter( link => link.type === 'icon' ), { ofMinLength: 1 })
    ) {
      const icon = dlv( this.props.attributes, `${asks[questionCode].links.filter( link => link.type === 'icon' )[0].code}.PRI_ICON_CODE.value` );

      return icon;
    }

    return null;
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
      ...this.props.inheritedThemes,
      ...filterThemes(
        this.state.themes,
        this.props.themes,
        {
          onlyInheritableThemes: true,
        }
      ),
    ];
  }

  getStyling = ( componentType ) => {
    // filter links for panel
    const inheritedLinks = [
      ...filterThemes(
        this.props.inheritedThemes,
        this.props.themes,
        {
          component: componentType,
        }
      ),
    ];

    const panelLinks = [
      ...filterThemes(
        this.state.themes,
        this.props.themes,
        {
          component: componentType,
        }
      ),
    ];

    // get props from theme links
    const inheritedThemeProps = getPropsFromThemes( inheritedLinks, this.props.themes );
    const themeProps = getPropsFromThemes( panelLinks, this.props.themes );

    const combinedThemeProps = objectMerge(
      isObject( this.props.inheritedProps ) ? this.props.inheritedProps : {},
      objectMerge( inheritedThemeProps, themeProps ),
    );

    return {
      ...combinedThemeProps,
    };
  }

  handleStateChange = ( newState ) => {
    this.setState( state => ({
      ...state,
      ...newState,
    }));
  }

  render() {
    const {
      inheritedThemes,
      themes,
      flexWrapper,
      index,
      onBlur,
      ...restProps
    } = this.props;

    let properties = {};

    const checkThemeForProperties = ( linkedThemes ) => {
      if ( !isArray( linkedThemes )) return;

      linkedThemes.forEach( linkedTheme => {
        const themeProperties = dlv( themes, `${linkedTheme.code}.properties` );

        if ( isObject( themeProperties )) {
          properties = {
            ...properties,
            ...themeProperties,
          };
        }
      });
    };

    checkThemeForProperties( inheritedThemes );
    checkThemeForProperties( this.state.themes );

    const getPropsByType = ( type ) => {
      const typeThemes = this.getStyling( type );

      return {
        ...isObject( typeThemes, { withProperty: 'default' }) ? typeThemes['default'] : {},
        ...isObject( typeThemes, { withProperty: 'disabled' }) &&
          ( this.props.editable === false || this.props.disabled )
          ? typeThemes['disabled'] : {},
        ...isObject( typeThemes, { withProperty: 'error' }) && this.props.error ? typeThemes['error'] : {},
        icon: this.getIcon(),
      };
    };

    const getSubcomponentPropsByType = ( type ) => {
      const typeThemes = this.getStyling( type );

      const icon = this.getIcon();

      // console.log(  'typeThemes', type, typeThemes );

      return {
        // ,
        ...isObject( typeThemes, { withProperty: 'default' }) ? { default: typeThemes['default'] } : {},
        ...isObject( typeThemes, { withProperty: 'hover' }) ? { hover: typeThemes['hover'] } : {},
        ...isObject( typeThemes, { withProperty: 'active' })  ? { active: typeThemes['active'] } : {},
        ...isObject( typeThemes, { withProperty: 'disabled' }) &&
          ( this.props.editable === false || this.props.disabled )
          ? { disabled: typeThemes['disabled'] } : {},
        ...isObject( typeThemes, { withProperty: 'error' }) && this.props.error ? { error: typeThemes['error'] } : {},
        ...icon ? { icon } : {},
      };
    };

    const getSubcomponentProps = () => {
      const subcomponentThemes = {};

      subcomponents.forEach( subcomponent => {
        subcomponentThemes[subcomponent] = getSubcomponentPropsByType( subcomponent );
      });

      return subcomponentThemes;
    };

    return (
      /* WRAPPER */
      <Box
        flexDirection="column"
        flex={flexWrapper ? 1 : null}
        justifyContent="center"
        zIndex={100 - index}
        // padding={5}
        {...getPropsByType( 'vcl-wrapper' )}
      >

        {(
          properties.renderVisualControlLabel
        ) && (
          <Box
            flexDirection="row"
          >

            {/* LABEL */}
            <Box
              {...getPropsByType( 'vcl-label' )}
            >
              <Text
                size="xs"
                text={this.props.question.name}
                // decoration="underline"
                {...getPropsByType( 'vcl-label' )}
              />
            </Box>

            {/* REQUIRED */}
            {(
              properties.renderVisualControlRequired &&
              this.props.required
            ) && (
              <Box
                paddingLeft={5}
                marginRight="auto"
              >
                <Text
                  text="*"
                  color="red"
                />
              </Box>
            )}

            {/* HINT */}
            {(
              properties.renderVisualControlHint
            ) && (
              <Box
                paddingLeft={5}
                paddingRight={5}
                cursor="pointer"
                {...getPropsByType( 'vcl-hint' )}
              >
                <Icon
                  name="help"
                  size="xs"
                  color="grey"
                  cursor="help"
                  {...getPropsByType( 'vcl-hint' )}
                />
              </Box>
            )}
          </Box>
        )}

        {/* DESCRIPTION */}
        {(
          properties.renderVisualControlDescription
        ) && (
          <Box
            paddingBottom={5}
            {...getPropsByType( 'vcl-description' )}
          >
            <Text
              size="xxs"
              text="Description text goes here"
              {...getPropsByType( 'vcl-description' )}
            />
          </Box>
        )}

        {/* INPUT COMPONENT */}
        <FormInput
          {...restProps}
          {...getPropsByType( 'input' )}
          subcomponentProps={getSubcomponentProps()}
          onBlur={onBlur}
          iconProps={properties.renderVisualControlIcon ? getPropsByType( 'vcl-icon' ) : null}
          iconOnly={(
            properties.renderVisualControlInput != null
              ? !properties.renderVisualControlInput
              : false
          )}
          inheritedProps={this.getInhertiableThemes()}
          padding={3}
          onChangeState={this.handleStateChange}
        />

        {/* ERROR MESSAGE */}
        {(
          isString( this.props.error )
        ) && (
          <Box
            flexDirection="column"
            {...getPropsByType( 'vcl-error' )}
          >
            <Text
              size="xxs"
              color="red"
              text={this.props.error}
              {...getPropsByType( 'vcl-error' )}
            />
          </Box>
        )}
      </Box>
    );
  }
}

export { VisualControl };

const mapStateToProps = state => ({
  themes: state.vertx.layouts.themes,
  asks: state.vertx.layouts.asks,
  attributes: state.vertx.baseEntities.attributes,
});

export default connect( mapStateToProps )( VisualControl );
