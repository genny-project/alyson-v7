import dlv from 'dlv';
import { isArray, isObject, isString, sort  } from '../../index';

const filterThemes = ( themeLinks, allThemes, options = {}) => {
  const {
    panel,
    component,
    onlyInheritableThemes,
    formGroup,
  } = options;

  const themes = [];

  if (
    !isArray( themeLinks ) ||
    !isObject( allThemes )
  )
    return {};

  sort( themeLinks, { paths: ['weight', 'created'], direction: 'asc' }).forEach( theme => {
    if ( isString( panel ) && theme.panel !== panel ) return;
    if ( isString( component ) && !( theme.component === component || theme.component === 'all' || theme.component == null )) return;
    if ( formGroup && !( theme.component == null || theme.component === 'all' )) return;

    const properties = dlv( allThemes, `${theme.code}.properties` );

    if (
      onlyInheritableThemes &&
      isObject( properties, { withProperty: 'inheritable' }) &&
      properties.inheritable === false
    )
      return;

    // console.log( 'added' );

    themes.push( theme );
  });

  return themes;
};

export default filterThemes;
