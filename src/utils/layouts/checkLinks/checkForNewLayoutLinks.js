import dlv from 'dlv';
import { isArray, isObject, shallowCompare } from '../../index';

const checkForNewLayoutLinks = ( currentArray, newArray, layoutData, options = {}) => {
  const { ignoreAdd, ignoreRemove, ignoreNewPanel } = options;

  const currentLinks = [];
  const newLinks = [];

  if ( !isArray( currentArray ) || !isArray( newArray ) || !isObject( layoutData )) {
    return false;
  }

  /* Get just the target codes */
  if ( isArray( currentArray )) {
    currentArray.forEach( item => {
      currentLinks.push( item.code );
    });
  }

  if ( isArray( newArray )) {
    newArray.forEach( item => {
      /* Ask Bes are being passed to Frame via the baseEntity prop, while frames and
       themes have their own props so we need to check where we are looking for a base
       entity. If no entity is found that matches the target code  of the link, it is
       not added to the array of new links */

      if ( item.type === 'sublayout' || isObject( dlv( layoutData, `${item.type}s.${item.code}` ))) {
        // console.log(item.code)
        newLinks.push( item.code );
      }
    });
  }

  // console.log(newLinks);

  /* Find the differences between the two sets of links */
  const toAdd = newLinks.filter( item => !currentLinks.includes( item ));
  const toRemove = currentLinks.filter( item => !newLinks.includes( item ));

  const toChangePanel = [];

  /* For items that have the same target, check if the panel ( linkValue ) is the same*/
  newLinks.filter( newLinkCode => currentLinks.includes( newLinkCode )).forEach( newLinkCode => {
    const oldBe = currentArray.filter( link => link.code === newLinkCode )[0];
    const newBe = newArray.filter( link => link.code === newLinkCode )[0];

    const isPanelMatch = shallowCompare( oldBe, newBe );

    if ( !isPanelMatch ) toChangePanel.push( newLinkCode );
  });

  /* if any changes are found, update */
  if ( toAdd.length > 0 || toRemove.length > 0 || toChangePanel.length > 0 ) {
    return true;
  }

  if ( toAdd.length > 0 && !ignoreAdd ) return true;

  if ( toRemove.length > 0 && !ignoreRemove ) return true;

  if ( toChangePanel.length > 0 && !ignoreNewPanel ) return true;

  return false;
};

export default checkForNewLayoutLinks;
