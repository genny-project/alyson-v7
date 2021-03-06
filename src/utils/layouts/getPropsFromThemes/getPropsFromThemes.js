import dlv from 'dlv';
import { isArray, isObject, sort, objectMerge  } from '../../index';

const getPropsFromThemes = ( links, themes ) => {
  let props = {};

  if (
    !isArray( links ) ||
    !isObject( themes )
  )
    return {};

  sort( links, { paths: ['weight', 'created'], direction: 'asc' }).forEach( theme => {
    const themeData = dlv( themes, `${theme.code}.data` );

    if ( isObject( themeData )) {
      props = objectMerge( props, themeData );
    }
  });

  return props;
};

export default getPropsFromThemes;
