import dlv from 'dlv';
import { isArray, isObject, isString, sort  } from '../../index';

const filterThemes = ( themeCodes, allThemes, options = {}) => {
  const {
    panel,
    onlyInheritableThemes,
  } = options;

  let styling = {};

  if (
    !isArray( themeCodes ) ||
    !isObject( allThemes )
  )
    return {};

  sort( themeCodes, { paths: ['weight', 'created'], direction: 'asc' }).forEach( theme => {
    if ( isString( panel ) && theme.panel !== panel ) return;

    const themeData = dlv( allThemes, `${theme.code}.data` );
    const properties = dlv( allThemes, `${theme.code}.properties` );

    if (
      onlyInheritableThemes &&
      isObject( properties, { withProperty: 'inheritable' }) &&
      properties.inheritable === false
    )
      return;

    if ( isObject( themeData )) {
      styling = {
        ...styling,
        ...themeData,
      };
    }
  });

  return styling;
};

export default filterThemes;
