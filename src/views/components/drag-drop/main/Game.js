let itemPositions = {};
let observersItem = {};

let options = {
  bump: false,
};

const emitChangeItem = ( code ) => {
  code && observersItem && observersItem[code] && observersItem[code]( itemPositions );

  // observersItem.forEach( o => {
  //   console.log( o );
  //   o && o( itemPositions );
  // });
};

export const observeItem = ( o, code ) => {
  console.warn({ observersItem, code });
  observersItem[code] = o ;
  emitChangeItem( code );

  return () => {
    observersItem = observersItem[code];
  };
};

export const moveItem = ( toX, name, code ) => {
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

  emitChangeItem( code );
};

export const setItems = ( items, code, optionsConfig = {}) => {
  itemPositions = items;

  options = {
    ...options,
    ...optionsConfig,
  };

  emitChangeItem( code );
};
