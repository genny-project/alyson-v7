let itemPositions = {
  Banana: null,
  Apple: null,
  Pear: null,
  Orange: null,
};

let observersItem = [];

const options = {
  bump: false,
};

function emitChangeItem() {
  observersItem.forEach( o => o && o( itemPositions ));
}

export function observeItem( o ) {
  observersItem.push( o );
  emitChangeItem();

  return () => {
    observersItem = observersItem.filter( t => t !== o );
  };
}

export function moveItem( toX, name ) {
  itemPositions = {
    ...itemPositions,
  };

  if ( options.bump ) {
    Object.keys( itemPositions ).forEach( itemKey => {
      if (
        toX != null &&
        itemPositions[itemKey] === toX &&
        itemKey !== name
      ) {
        itemPositions[itemKey] = null;
      }
    });
  }

  itemPositions[name] = toX;

  emitChangeItem();
}
