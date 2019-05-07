import dlv from 'dlv';
import { isArray, isObject, isString, sort  } from '../../index';

const filterThemes = ( themeLinks, allThemes, options = {}) => {
  const {
    panel,
    component,
    onlyInheritableThemes,
    formGroup,
    onlyComponentThemes,
  } = options;

  const themes = [];

  if (
    !isArray( themeLinks ) ||
    !isObject( allThemes )
  )
    return {};

  sort( themeLinks, { paths: ['weight', 'created'], direction: 'asc' }).forEach( theme => {
    if ( isString( panel ) && theme.panel !== panel ) return;

    if ( isString( panel ) && ( !isString( component ) && theme.component )) return;

    if ( isString( component ) && !( theme.component === component || theme.component === 'all' || theme.component == null )) return;

    if ( formGroup && !( theme.component == null || theme.component === 'all' )) return;

    if ( onlyComponentThemes && !( theme.component === component )) return true;

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
