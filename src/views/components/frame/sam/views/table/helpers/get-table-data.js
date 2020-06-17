import {
  path,
  compose,
  pickBy,
  prop,
  map,
  contains,
  values,
  sortBy,
  head,
  keys,
  replace,
  not,
  isEmpty,
} from 'ramda';

const getTitle = path(['metaData', 'SCH_TITLE', 'value']);

const getColumns = compose(
  map(col => ({
    ...col,
    title: prop('attributeName', col),
    field: replace('COL_', '', prop('attributeCode', col)),
  })),
  sortBy(prop('weight')),
  values,
  pickBy((val, key) => contains('COL_', key || '') && !contains('_EVENT_', key || '')),
  prop('metaData')
);

const getData = compose(
  map(row => ({ targetCode: head(keys(row)), ...prop(head(keys(row)), row) })),
  prop('data')
);

const getTable = currentSearch =>
  not(isEmpty(currentSearch))
    ? {
        searchCode: head(keys(currentSearch)),
        ...prop(head(keys(currentSearch)), currentSearch),
      }
    : false;

export { getTitle, getColumns, getData, getTable };
