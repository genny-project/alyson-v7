import {
  path,
  compose,
  head,
  prop,
  map,
  replace,
  tail,
  mergeAll,
  contains,
  filter,
  prepend,
} from 'ramda';

const makeColumns = compose(
  map(({ attributeCode, name }) => ({ title: name, field: replace( '_HEADER', '', attributeCode ) })),
  filter(({ attributeCode }) => !contains( 'PRI_EVENT', attributeCode )),
  prop( 'childAsks' )
);

const makeCell = attributes =>
  compose(({ targetCode, attributeCode }) => ({
    [attributeCode]: path( [targetCode, attributeCode, 'value'], attributes ),
  }));

const makeRow = attributes =>
  compose(
    mergeAll,
    map( makeCell( attributes )),
    prop( 'childAsks' )
  );

const makeRows = attributes => compose( map( makeRow( attributes )));

const getTitle = ({ asks, attributes, frames }) =>
  compose(
    ({ attributeCode, targetCode }) => path( [targetCode, attributeCode, 'value'], attributes ),
    ({ code }) => prop( code, asks ),
    head,
    path( ['FRM_TABLE_TITLE', 'links'] )
  )( frames );

const getColumns = ({ table }) =>
  compose(
    makeColumns,
    head
  )( table );

const getData = ({ table, attributes }) =>
  compose(
    makeRows( attributes ),
    tail
  )( table );

export { getTitle, getColumns, getData };
