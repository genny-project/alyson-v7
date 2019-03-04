import { isObject  } from '../../index';
import shallowCompare from '../../shallow-compare';

const checkForNewInheritedThemes = ( currentObject, newObject ) => {
  if (
    !isObject( currentObject ) &&
    !isObject( newObject )
  ) return false;

  if ( !isObject( newObject )) return false;

  if ( !isObject( currentObject )) return true;

  if ( shallowCompare( currentObject, newObject )) return false;

  return true;
};

export default checkForNewInheritedThemes;
