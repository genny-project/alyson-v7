import dlv from 'dlv';
import { isArray, isObject, isString, sort  } from '../../index';

const filterThemes = ( themeLinks, allThemes, options = {}) => {
  const {
    panel,
    component,
    onlyInheritableThemes,
    acceptTypes,
    onlyComponentThemes,
    dataType,
  } = options;

  const themes = [];

  if (
    !isArray( themeLinks ) ||
    !isObject( allThemes )
  )
    return {};

  sort( themeLinks, { paths: ['weight', 'created'], direction: 'asc' }).forEach( theme => {
    if (
      isString( panel ) && (
        theme.panel !== panel &&
        theme.panel !== 'FRAME'
      ))
      return;

    if (
      isString( panel ) && (
        !isString( component ) &&
        theme.component
      ))
      return;

    if (
      !isArray( acceptTypes ) &&
      isString( component ) &&
      !(
        theme.component === component ||
        theme.component == null
      ))
      return;

    if (
      isArray( acceptTypes ) &&
      !(
        theme.component === component ||
        theme.component == null ||
        acceptTypes.includes( theme.component )
      ))
      return;

    if (
      isString( dataType ) &&
      !(
        theme.dataType === dataType ||
        theme.dataType == null
      ))
      return;

    if (
      onlyComponentThemes &&
      !( theme.component === component )
    )
      return true;

    const properties = dlv( allThemes, `${theme.code}.properties` );

    if (
      onlyInheritableThemes &&
      isObject( properties, { withProperty: 'inheritable' }) &&
      properties.inheritable === false
    )
      return;

    themes.push( theme );
  });

  return themes;
};

export default filterThemes;
