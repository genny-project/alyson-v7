import { compose, pickBy, contains, values, map, replace, prop } from 'ramda'

const getLaneActions = compose(
  map(action => ({ ...action, code: replace('COL_', 'QUE_', prop('attributeCode', action)) })),
  values,
  pickBy((val, key) => contains('_PRI_EVENT_', key)),
)

export default getLaneActions
