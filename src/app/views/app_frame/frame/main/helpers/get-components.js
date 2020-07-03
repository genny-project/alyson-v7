import {
  map,
  pick,
  compose,
  path,
  prop,
  mapObjIndexed,
  keys,
  pathOr,
  length,
  find,
  head,
  pickBy,
  includes,
  replace,
  equals,
} from 'ramda'

const getLinksFrom = (key, frames) =>
  compose(
    map(prop('code')),
    path([key, 'links']),
  )(frames)

const getComponents = ({ frames, asks, themes }) =>
  mapObjIndexed((frame, key, obj) => prop('links'), frames)

const getUserType = compose(
  type => (type === '_ADMIN' ? '' : type),
  replace('PRI_IS', ''),
  keys => (length(keys) > 1 ? find(equals('PRI_IS_ADMIN'))(keys) || head(keys) : head(keys)) || '',
  keys,
  pickBy((val, key) => includes('_IS_', key) && prop('value', val)),
  pathOr({}, ['attributes']),
)
const getDrawerItems = (frames, asks, user) =>
  pick(getLinksFrom(`FRM_SIDEBAR${getUserType(user)}`, frames), frames)

const getAppBarItems = (frames, asks, themes) => pick(getLinksFrom('FRM_HEADER', frames), frames)

export { getComponents, getDrawerItems, getLinksFrom, getAppBarItems }
