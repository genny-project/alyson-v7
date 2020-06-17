import {
  path,
  compose,
  pickBy,
  prop,
  map,
  includes,
  values,
  sortBy,
  head,
  keys,
  replace,
  not,
  isEmpty,
} from 'ramda'

const removeCOL_ = replace('COL_', '')

const getTitle = path(['metaData', 'SCH_TITLE', 'value'])

const getActions = compose(
  map(action => ({
    ...action,
    attributeCode: replace('COL_', 'QUE_', prop('attributeCode', action)),
  })),
  values,
  pickBy((val, key) => includes('_EVENT_', key)),
  prop('metaData'),
)

const getColumns = compose(
  map(col => ({
    ...col,
    title: prop('attributeName', col),
    field: removeCOL_(prop('attributeCode', col)),
  })),
  sortBy(prop('weight')),
  values,
  pickBy((val, key) => includes('COL_', key || '') && !includes('_EVENT_', key || '')),
  prop('metaData'),
)

const getData = compose(
  map(row => ({ targetCode: head(keys(row)), ...prop(head(keys(row)), row) })),
  prop('data'),
)

const getTable = currentSearch =>
  not(isEmpty(currentSearch))
    ? {
        searchCode: head(keys(currentSearch)),
        ...prop(head(keys(currentSearch)), currentSearch),
      }
    : false

const icons = {
  View: 'list',
  Apply: 'edit',
  Journal: 'book',
}
const getIcon = name => prop(name, icons)

export { getTitle, getColumns, getData, getTable, getActions, getIcon }
