import React, { Component } from 'react';
import { string, object, bool } from 'prop-types';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { isArray, isObject, getLayoutLinksOfType, checkForNewLayoutLinks, filterThemes, getPropsFromThemes, objectMerge } from '../../../../utils';
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

class VisualControl extends Component {
  static propTypes = {
    // type: string.isRequired,
    question: object,
    // onChangeValue: func.isRequired,
    ask: object,
    asks: object,
    inheritedProps: object,
    inheritedThemes: object,
    themes: object,
    error: string,
    required: bool,
    editable: bool,
    disabled: bool,
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

    if ( !ask ) {
      return null;
    }

    const { questionCode } = ask;

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
        ...restProps,
        ...isObject( typeThemes, { withProperty: 'default' }) ? typeThemes['default'] : {},
        ...isObject( typeThemes, { withProperty: 'hover' }) && this.state.hover ? typeThemes['hover'] : {},
        ...isObject( typeThemes, { withProperty: 'active' }) && this.state.active ? typeThemes['active'] : {},
        ...isObject( typeThemes, { withProperty: 'disabled' }) &&
          ( this.props.editable === false || this.props.disabled )
          ? typeThemes['disabled'] : {},
      };
    };

    /*
      get themes for each visual control element,
      and for the current visual control state

      is active different from selected ?

      states: {
        hover, (cursor is highlighting the input, but its not selected)
        active, (input is currently focused)
        readonly, (input is read only)
        disabled, (input functionality is disabled)
        error, (input failed validation)
        closed, (any parent component is closed)
      }
    */

    /*
      does icon need to be included in the input?
    */

    return (
      /* WRAPPER */
      <Box
        flexDirection="column"
        flex={1}
        justifyContent="centre"
        // padding={5}
        {...getPropsByType( 'wrapper' )}
      >

        {(
          properties.renderVisualControlLabel
        ) && (
          <Box
            flexDirection="row"
            width="100%"
            paddingBottom={5}
          >

            {/* LABEL */}
            <Box
              {...getPropsByType( 'label' )}
            >
              <Text
                size="xs"
                text={this.props.question.name}
                // decoration="underline"
                {...getPropsByType( 'label' )}
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
                {...getPropsByType( 'hint' )}
              >
                <Icon
                  name="help"
                  size="xs"
                  color="grey"
                  cursor="help"
                  {...getPropsByType( 'hint' )}
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
            {...getPropsByType( 'description' )}
          >
            <Text
              size="xxs"
              text="Description text goes here"
              {...getPropsByType( 'description' )}
            />
          </Box>
        )}

        {/* <InputWrapper
          flexDirection="row"
          width="100%"
        > */}
        {/* ICON */}
        {/* {(
          properties.renderVisualControlIcon
        ) && (
          <Box
            paddingRight={5}
            {...getPropsByType( 'icon' )}
          >
            <Icon
              name="home"
              color="black"
              cursor="default"
              {...getPropsByType( 'icon' )}
            />
          </Box>
        )} */}

        {/* INPUT COMPONENT */}
        <FormInput
          {...getPropsByType( 'input' )}
          iconProps={getPropsByType( 'icon' )}
          inheritedProps={this.getInhertiableThemes()}
          padding={3}
          onChangeState={this.handleStateChange}
        />

        {/* </InputWrapper> */}

        {/* ERROR MESSAGE */}
        {(
          this.props.error != null
        ) && (
          <Box
            {...getPropsByType( 'error' )}
          >
            <Text
              size="xxs"
              color="red"
              text={this.props.error}
              {...getPropsByType( 'error' )}
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
});

export default connect( mapStateToProps )( VisualControl );
