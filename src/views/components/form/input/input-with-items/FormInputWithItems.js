import { Component } from 'react';
import { object, func, array } from 'prop-types';
import { connect } from 'react-redux';
import dlv from 'dlv';
import { isArray, isObject, getLayoutLinksOfType, filterThemes, getPropsFromThemes, isString, isInteger, sort } from '../../../../../utils';

class FormInputWithItems extends Component {
  static propTypes = {
    question: object,
    baseEntities: object,
    themes: object,
    // inheritedThemes: array,
    inheritedProps: array,
    children: func,
  }

  state = {
    items: [],
  }

  componentDidMount() {
    this.setInitialItems();
  }

  componentDidUpdate() {
    this.checkForUpdatedItems();
  }

  setInitialItems() {
    const items = this.getItems();

    this.setState({ items });
  }

  getItems() {
    const { data, links } = this.props.baseEntities;
    const { validationList } = this.props.question.attribute.dataType;
    const items = [];

    if ( isArray( validationList, { ofMinLength: 1 })) {
      validationList.forEach( validation => {
        const { selectionBaseEntityGroupList, options } = validation;

        if (
          isArray( selectionBaseEntityGroupList, { ofMinLength: 0 })
        ) {
          validation.selectionBaseEntityGroupList.forEach( baseEntity => {
            const linkGroup = links[baseEntity];

            if (
              isObject( linkGroup )
            ) {
              const linkValues = Object.keys( linkGroup ).map( x => x );

              linkValues.forEach( linkValue => {
                if ( isArray( linkGroup[linkValue] )) {
                  linkGroup[linkValue].forEach( link => {
                    const baseEntity = dlv( data, link.link.targetCode );

                    if ( isObject( baseEntity )) {
                      items.push({
                        label: baseEntity.name,
                        value: baseEntity.code,
                        weight: link.weight || 1,
                      });
                    }
                  });
                }
              });
            }
          });
        }

        if ( isArray( options, { ofMinLength: 1 })) {
          options.forEach(( option, index ) => {
            if ( isString( option ) || isInteger( option )) {
              items.push({
                label: option,
                value: option,
                weight: index + 1 || 1,
              });
            }
            else if ( isObject( option )) {
              items.push({
                label: option.name,
                value: option.code,
                weight: index + 1 || 1,
              });
            }
          });
        }
      });
    }

    return items;
  }

  getThemesForItems = ( items ) => {
    const { data } = this.props.baseEntities;

    if ( isArray( items )) {
      const itemsWithStyling = items.map( item => {
        const baseEntity = dlv( data, item.value );
        // get all links, check for themes for this base entity

        if ( !isObject( baseEntity )) return item;

        const linkedThemes = isArray( baseEntity.links )
          ? getLayoutLinksOfType( baseEntity.links.map( link => ({ type: 'theme', code: link.link.targetCode })), this.props, 'theme' )
          : [];

        const getStyling = () => {
          // filter links for panel
          const inheritedLinks = [
            ...filterThemes(
              this.props.inheritedProps,
              this.props.themes,
            ),
          ];

          const panelLinks = [
            ...filterThemes(
              linkedThemes,
              this.props.themes,
            ),
          ];

          // get props from theme links
          const inheritedThemeProps = getPropsFromThemes(
            inheritedLinks,
            this.props.themes,
          );
          const themeProps = getPropsFromThemes( panelLinks, this.props.themes );

          const props = {
            ...this.props.inheritedProps,
            ...inheritedThemeProps,
            ...themeProps,
          };

          return props;
        };

        const newItem = {
          ...item,
          style: getStyling()['default'],
        };

        return newItem;
      });

      return itemsWithStyling;
    }

    return items;
  }

  checkForUpdatedItems() {
    const { items } = this.state;
    const newItems = this.getItems();

    // TODO check for new theme information

    if (
      items.length === 0 &&
      newItems.length > 0
    ) {
      this.setState({ items: newItems });

      return;
    }

    if (
      items.length > 0 &&
      newItems.length === 0
    ) {
      this.setState({ items: newItems });

      return;
    }

    for ( let i = 0; i < items.length; i++ ) {
      const item = items[i];
      const newItem = newItems[i];

      if ( !newItem ) {
        this.setState({ items: newItems });

        return;
      }

      if ( item.value !== newItem.value ) {
        this.setState({ items: newItems });

        return;
      }
    }
  }

  focus() {
    if (
      this.input &&
      this.input.focus
    ) {
      this.input.focus();
    }
  }

  render() {
    const { children } = this.props;
    const { items } = this.state;

    const itemsWithThemes = this.getThemesForItems( items );

    return children({
      items: sort( itemsWithThemes, { paths: ['weight'], direction: 'desc' }),
    });
  }
}

export { FormInputWithItems };

const mapStateToProps = state => ({
  themes: state.vertx.layouts.themes,
  baseEntities: state.vertx.baseEntities,
});

export default connect( mapStateToProps )( FormInputWithItems );
