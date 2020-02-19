import dlv from 'dlv';
import { isArray, isObject, isString, isInteger, sort  } from '../../index';

const filterThemes = ( themeLinks, allThemes, options = {}) => {
  const {
    panel,
    component,
    onlyInheritableThemes,
    acceptTypes,
    onlyComponentThemes,
    // dataType,
    dataTypeName,
    dataTypeCode,
    childIndex,
    totalChildren,
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
      isInteger( childIndex )
    ) {
      if (
        isInteger( theme.selectorType ) &&
        (( childIndex + 1 ) % theme.selectorType ) !== 0
      ) {
        return;
      }

      if (
        isString( theme.selectorType, { isSameAs: 'first' }) &&
        childIndex > 0
      ) {
        return;
      }

      if (
        isString( theme.selectorType, { isSameAs: 'not-first' }) &&
        childIndex < 1
      ) {
        return;
      }

      if (
        isString( theme.selectorType, { isSameAs: 'last' }) &&
        childIndex !== ( totalChildren - 1 )
      ) {
        return;
      }

      if (
        isString( theme.selectorType, { isSameAs: 'not-last' }) &&
        childIndex === ( totalChildren - 1 )
      ) {
        return;
      }
    }

    // if (
    //   !onlyInheritableThemes &&
    //   isString( theme.dataType ) &&
    //   // isString( dataType ) &&
    //   !(
    //     isString( dataType ) &&
    //     dataType.toLowerCase() === theme.dataType.toLowerCase()
    //   )) return;

    if (
      !onlyInheritableThemes &&
      isString( theme.dataTypeName ) &&
      !(
        isString( dataTypeName ) &&
        dataTypeName.toLowerCase() === theme.dataTypeName.toLowerCase()
      )) return;

    if (
      !onlyInheritableThemes &&
      isString( theme.dataTypeCode ) &&
      !(
        isString( dataTypeCode ) &&
        dataTypeCode.toLowerCase() === theme.dataTypeCode.toLowerCase()
      )) return;

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
