import { map, pick, compose, path, prop, mapObjIndexed } from 'ramda'

const getLinksFrom = (key, frames) =>
  compose(
    map(prop('code')),
    path([key, 'links']),
  )(frames)

const getDrawerItems = frames => pick(getLinksFrom('FRM_SIDEBAR', frames), frames)

const getAppBarItems = frames => pick(getLinksFrom('FRM_HEADER', frames), frames)

export { getDrawerItems, getLinksFrom, getAppBarItems }
